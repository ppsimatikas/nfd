from firebase_functions import https_fn, options

from api.controllers.ai_controller import process_ai_call
from api.controllers.sql_controller import process_sql_call
from api.controllers.tables_controller import process_tables_call

cors_options = options.CorsOptions(
    # cors_origins="*",
    cors_origins=[r"demeterai\.xyz$", r"https://demeterai\.xyz"],
    cors_methods=["get", "post"]
)


@https_fn.on_request(
    region="europe-west1",
    cors=cors_options,
    timeout_sec=120,
    memory=options.MemoryOption.MB_512,
)
def tables(req: https_fn.Request) -> https_fn.Response:
    return process_tables_call(req)


@https_fn.on_request(
    region="europe-west1",
    cors=cors_options,
    timeout_sec=120,
    memory=options.MemoryOption.MB_512,
)
def sql(req: https_fn.Request) -> https_fn.Response:
    return process_sql_call(req)


@https_fn.on_request(
    region="europe-west1",
    cors=cors_options,
    timeout_sec=120,
    memory=options.MemoryOption.MB_512,
)
def ai(req: https_fn.Request) -> https_fn.Response:
    return process_ai_call(req)
