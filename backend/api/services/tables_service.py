import pandas as pd
from sdk.nfd import Nfd


def get_tables():
    # TODO: Fetch schemas and tables from blockchain
    tables = {
        "agriculture": ["crops_and_livestock"]
    }
    return tables


def get_table_list():
    tables = get_tables()
    list_of_tables = [
        [f"{table}" for table in tables[schema]]
        # [f"{schema}.{table}" for table in tables[schema]]
        for schema in tables
    ]

    # flatten
    return [item for sublist in list_of_tables for item in sublist]


def create_table(data):
    df = pd.DataFrame(data["data"])

    Nfd().create_table(data["domain"], data["table"], df)
    return {"success": True}
