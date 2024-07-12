from sdk.nfd import Nfd


def sql(table: str, query: str):
    df = Nfd().sql(table, query)
    return df.to_json(orient='records')
