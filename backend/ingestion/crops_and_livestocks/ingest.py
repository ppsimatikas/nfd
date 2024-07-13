from datetime import datetime

import faostat
from dotenv import load_dotenv
from sdk.nfd import Nfd

load_dotenv()


def ingest():
    min_year = 2010
    current_year = datetime.now().year
    filters = {
        'year': range(min_year, current_year),
    }

    df = faostat.get_data_df('QCL', pars=filters)

    nfd = Nfd()
    nfd.create_table("agriculture", "crops_and_livestock", df)
