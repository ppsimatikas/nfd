import pandas as pd
from sdk.nfd import Nfd


def get_tables():
    # TODO: Fetch schemas and tables from blockchain
    tables = {
        "agriculture": ["crops_and_livestock"]
    }
    return tables


def create_table(data):
    df = pd.DataFrame(data["data"])

    Nfd().create_table(data["domain"], data["table"], df)
    return {"success": True}
