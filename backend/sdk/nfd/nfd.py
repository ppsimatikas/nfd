import os
from typing import Optional

import pandas as pd
import pandasql as psql

from ..lighthouse import Lighthouse

MISSING_API_KEY_ERROR = """

Please provide a lighthouse_token, or set the `LIGHTHOUSE_TOKEN` environment variable.
Generate your token here: https://files.lighthouse.storage/dashboard/apikey
"""


class Nfd:
    """
    A client for the NFD architecture.

    This class provides methods to interact with on chain NFDs

    Args:
        lighthouse_token (str): The API key for authenticating with the Lighthouse API
                        Generate it here: https://files.lighthouse.storage/dashboard/apikey

    """
    def __init__(self, lighthouse_token: Optional[str] = None):
        lighthouse_token = lighthouse_token if lighthouse_token else os.environ.get("LIGHTHOUSE_TOKEN")

        if not lighthouse_token:
            raise ValueError(MISSING_API_KEY_ERROR)

        self.lh = Lighthouse(lighthouse_token)

    def list_tables(self):
        files = self.lh.list_files()
        #TODO: Read the tables and cids from blockchain
        return files

    def create_table(self, schema: str, table: str, df: pd.DataFrame):
        cid = self.lh.upload_df(table, df, schema)
        #TODO: Write the cid to blockchain
        return True

    def load_table(self, table: str) -> pd.DataFrame:
        #TODO: Read the cid from blockchain
        return self.lh.download_df(table)

    def sql(self, table: str, sql: str) -> pd.DataFrame:
        return psql.sqldf(sql, {table: self.load_table(table)})
