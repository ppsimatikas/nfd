import pandas as pd
from dotenv import load_dotenv

from sdk.nfd import Nfd

load_dotenv()


def ingest():
    # https://ourworldindata.org/hunger-and-undernourishment
    df = pd.read_csv('ingestion/hunger/share-of-children-underweight.csv')

    nfd = Nfd()
    nfd.create_table("agriculture", "hunger_levels", df)
