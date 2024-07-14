from datetime import datetime

import faostat
from dotenv import load_dotenv
from sdk.nfd import Nfd

load_dotenv()


def ingest():
    min_year = 2016
    current_year = datetime.now().year
    filters = {
        'year': range(min_year, current_year),
        'element code': ['5510', '5419'],
        'item': ['515', '526', '44', '260', '490', '15', '27']
    }

    df = faostat.get_data_df('QCL', pars=filters, null_values=False, show_notes=False)

    nfd = Nfd()
    nfd.create_table("agriculture", "crops_and_livestock", df)
