from firebase_functions import https_fn
from api.services.sql_service import sql


def process_sql_call(req: https_fn.Request):
    match req.method:
        case "POST":
            table = req.args.get('table')
            query = req.get_json(silent=True).get('query')

            return sql(table, query), 200
        case _:
            return https_fn.Response(status=404, response="Not Found")
