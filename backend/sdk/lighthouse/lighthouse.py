import io

import pandas as pd
import requests
from lighthouseweb3 import Lighthouse as LighthouseWeb3


class Lighthouse(LighthouseWeb3):
    """
    A client for the Lighthouse API.

    This class provides methods to interact with the Lighthouse API. It handles the
    details of making HTTP requests and processing responses.
    The docs of the APIs can be found here: https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key

    Attributes:
        token (str): The API key for authenticating with the Lighthouse API
                        Generate it here: https://files.lighthouse.storage/dashboard/apikey
    """

    def list_files(self):
        headers = {
            'Authorization': f'Bearer {self.token}'
        }
        res = requests.get('https://api.lighthouse.storage/api/user/files_uploaded?lastKey=null', headers=headers)
        res.raise_for_status()
        json_res = res.json()
        return json_res.get('fileList', None)

    def upload_df(self, filename: str, df: pd.DataFrame, tag: str = None) -> str:
        buffer = io.BytesIO()
        df.to_parquet(buffer, index=False)
        buffer.seek(0)
        res = self.uploadBlob(buffer, f"{filename}.parquet", tag)
        return res['data']['Hash']

    def download_df(self, filename_or_cid: str, schema: str = None) -> pd.DataFrame:
        files = self.list_files()
        files = sorted(files, key=lambda x: x['createdAt'])
        cids = [f['cid'] for f in files if f['fileName'] == f"{filename_or_cid}.parquet"]
        cid = cids.pop() if len(cids) else filename_or_cid

        buffer = io.BytesIO()
        self.downloadBlob(buffer, cid)
        return pd.read_parquet(buffer)
