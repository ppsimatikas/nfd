from firebase_functions import https_fn
from api.services.tables_service import get_tables


def process_tables_call(req: https_fn.Request):
    match req.method:
        case "GET":
            return get_tables(), 200
        case _:
            return https_fn.Response(status=404, response="Not Found")
