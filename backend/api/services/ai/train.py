import io

import pandas as pd
from sdk.nfd import Nfd

pandas_to_sql_dtype = {
    'int64': 'BIGINT',
    'int32': 'INTEGER',
    'float64': 'FLOAT',
    'float32': 'FLOAT',
    'bool': 'BOOLEAN',
    'datetime64[ns]': 'TIMESTAMP',
    'timedelta64[ns]': 'INTERVAL',
    'object': 'TEXT'
}


def get_metadata(df: pd.DataFrame):
    schema_dict = df.dtypes.apply(lambda x: x.name).to_dict()
    return [
        {
            "name": k,
            "type": pandas_to_sql_dtype.get(schema_dict[k], 'TEXT')
        }
        for k in schema_dict
    ]


def get_create_sql(table_name):
    query = "select * from %s limit 1" % table_name
    df = Nfd().sql(table_name, query)
    meta = get_metadata(df)
    sql_fields = [
        f"`{m['name']}` {m['type']}"
        for m in meta
    ]

    fields_str = ', '.join(sql_fields)
    return f"CREATE TABLE `{table_name}` ({fields_str});"


def get_sample_rows(table_name):
    query = "select * from %s limit 5" % table_name

    def truncate_string(x):
        if isinstance(x, str):
            return x[:20]  # Truncate strings to 100 characters
        return x

    df = Nfd().sql(table_name, query)
    df = df.map(truncate_string)

    buffer = io.StringIO()
    df.to_csv(buffer, sep='\t', index=False)
    buffer.seek(0)
    df_string = buffer.getvalue()
    return (
        f"5 rows from {table_name} table:\n"
        f"{df_string}"
    )


def get_table_info(table_names) -> str:
    table_infos = []

    for table in table_names:
        # if table in tableDetails:
        #     table_infos.append(tableDetails[table])
        # else:
        # print("Loading", table)
        table_info = get_create_sql(table)
        table_info += "\n\n/*\n"
        table_info += get_sample_rows(table)
        table_info += "*/"
        table_infos.append(table_info)
        # print("Loaded", table)

    return "\n\n".join(table_infos)
