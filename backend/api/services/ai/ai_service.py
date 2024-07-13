from typing import List

from api.services.tables_service import get_table_list
from langchain.callbacks.manager import CallbackManagerForChainRun
from langchain.chains.llm import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
from sdk.nfd import Nfd

from .train import get_table_info

verbose = True

_mysql_prompt = """You are a MySQL expert. Given an input question, first create a syntactically correct MySQL query to run, then look at the results of the query and return the answer to the input question.
Unless the user specifies in the question a specific number of examples to obtain, query for at most {top_k} results using the LIMIT clause as per MySQL. You can order the results to return the most informative data in the database.
Never query for all columns from a table. You must query only the columns that are needed to answer the question. DO NOT Wrap each column name in backticks (`) to denote them as delimited identifiers.
Pay attention to use only the column names you can see in the tables below. Be careful to not query for columns that do not exist. Also, pay attention to which column is in which table.
Pay attention to use NOW() function to get the current date, if the question involves "today", DO NOT USE CURDATE.

Use the following format:

Question: Question here
SQLQuery: SQL Query to run
SQLResult: Result of the SQLQuery
Answer: Final answer here

"""

PROMPT_SUFFIX = """Only use the following tables:
{table_info}

Question: {input}"""

MYSQL_PROMPT = PromptTemplate(
    input_variables=["input", "table_info", "top_k"],
    template=_mysql_prompt + PROMPT_SUFFIX,
)

_get_tables_prompt = """Given this user input `{user_input}` return which tables from the list below are THE best match.
ONLY RETURN THE TABLE NAMES in a comma separated list, ORDERED BY BEST MATCHING.
IF THERE IS NO MUCH RETURN "NA"
"""


def get_potential_tables(user_input: str):
    gpt4 = ChatOpenAI(
        model_name="gpt-4",
        temperature=0,
        verbose=False
    )

    tables = get_table_list()
    print(tables)
    get_tables_prompt = _get_tables_prompt + ",".join(tables)
    find_tables_prompt = get_tables_prompt.replace("{user_input}", user_input)
    potential_tables = gpt4.predict(find_tables_prompt).strip()

    if "NA" in potential_tables:
        return tables[:1]

    return [t.strip() for t in potential_tables.split(",")]


def ask(user_input: str, table_names_to_use: List[str]):
    # print(input)
    llm = ChatOpenAI(
        # model_name="gpt-4",
        temperature=0,
        verbose=False
    )

    _run_manager = CallbackManagerForChainRun.get_noop_manager()
    input_text = f"{user_input}\nSQLQuery:"
    _run_manager.on_text(input_text, verbose=verbose)
    # If not present, then defaults to None which is all tables.
    table_info = get_table_info(table_names_to_use)
    llm_inputs = {
        "input": input_text,
        "top_k": str(5),
        "dialect": "MySQL",
        "table_info": table_info,
        "stop": ["\nSQLResult:"],
    }
    intermediate_steps = []
    llm_chain = LLMChain(llm=llm, prompt=MYSQL_PROMPT)
    try:
        intermediate_steps.append(llm_inputs.copy())  # input: sql generation
        sql_cmd = llm_chain.predict(
            callbacks=_run_manager.get_child(),
            **llm_inputs,
        ).strip()

        _run_manager.on_text(sql_cmd, color="green", verbose=verbose)
        intermediate_steps.append(sql_cmd)
        intermediate_steps.append({"sql_cmd": sql_cmd})  # input: sql exec
        # print("Executing SQL pre clean:", sql_cmd)
        # sql_cmd = sql_cmd.replace("`", "")
        sql_cmd = sql_cmd.replace("\n", " ").strip()
        # sql_cmd = sql_cmd.lower().split("select").pop().strip()
        # sql_cmd = "select " + sql_cmd
        print("Executing SQL:", sql_cmd)
        df = Nfd().sql(table_names_to_use[0], sql_cmd)
        result = [tuple(row) for row in df.itertuples(index=False, name=None)]
        result = str(result) if result else ""

        intermediate_steps.append(str(result))  # output: sql exec

        _run_manager.on_text("\nSQLResult: ", verbose=verbose)
        _run_manager.on_text(result, color="yellow", verbose=verbose)
        _run_manager.on_text("\nAnswer:", verbose=verbose)
        input_text += f"{sql_cmd}\nSQLResult: {result}\nAnswer:"
        llm_inputs["input"] = input_text
        intermediate_steps.append(llm_inputs.copy())  # input: final answer
        final_result = llm_chain.predict(
            callbacks=_run_manager.get_child(),
            **llm_inputs,
        ).strip()
        intermediate_steps.append(final_result)  # output: final answer
        _run_manager.on_text(final_result, color="green", verbose=verbose)

        # chain_result = {"result": final_result}
        return final_result, df
    except Exception as exc:
        # Append intermediate steps to exception, to aid in logging and later
        # improvement of few shot prompt seeds
        exc.intermediate_steps = intermediate_steps  # type: ignore
        raise exc
