import pandas as pd
from dotenv import load_dotenv

from sdk.nfd import Nfd

load_dotenv()


def ingest():
    # https://ourworldindata.org/grapher/value-of-agricultural-production
    df = pd.read_csv('ingestion/agriculture_value/value-of-agricultural-production.csv')

    nfd = Nfd()
    nfd.create_table("agriculture", "agriculture_value", df)
