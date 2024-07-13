import pandas as pd
from dotenv import load_dotenv

from sdk.nfd import Nfd

load_dotenv()


def ingest():
    # https://ourworldindata.org/land-use
    df = pd.read_csv('ingestion/land_use/agricultural-land.csv')
    df['square_km'] = df['hectares'] * 0.01

    nfd = Nfd()
    nfd.create_table("agriculture", "land_use", df)
