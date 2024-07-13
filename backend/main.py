from firebase_functions import https_fn, options

from api.controllers.ai_controller import process_ai_call
from api.controllers.sql_controller import process_sql_call
from api.controllers.tables_controller import process_tables_call


@https_fn.on_request(
    region="europe-west1",
    cors=options.CorsOptions(cors_origins="*", cors_methods=["post", "get"]),
    timeout_sec=120,
    memory=options.MemoryOption.MB_512,
    enforce_app_check=True
)
def on_request(req: https_fn.Request) -> https_fn.Response:
    match req.path:
        case "/tables":
            return process_tables_call(req)
        case "/sql":
            return process_sql_call(req)
        case "/ai":
            return process_ai_call(req)
        case _:
            return https_fn.Response(status=404, response="Not Found")
