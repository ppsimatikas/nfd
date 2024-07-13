from api.services.tables_service import get_tables, create_table
from firebase_functions import https_fn


def process_tables_call(req: https_fn.Request):
    match req.method:
        case "GET":
            return get_tables(), 200
        case "POST":
            data = req.get_json(silent=True)
            return create_table(data), 200
        case _:
            return https_fn.Response(status=404, response="Not Found")
