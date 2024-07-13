from api.services.ai import ask, get_potential_tables
from firebase_functions import https_fn


def _get_response(msg, status, df=None):
    return {
        "message": msg,
        "data": [] if df is None else df.to_dict('records'),
        "columns": [] if df is None else list(df.columns),
    }, status


def process_ai_call(req: https_fn.Request):
    match req.method:
        case "POST":
            body_data = req.get_json(silent=True)

            if body_data is None or "message" not in body_data:
                return _get_response("Wrong request.", 400)

            user_input = body_data["message"]
            print(user_input)

            tables = get_potential_tables(user_input)
            if not len(tables):
                response = "My apologies, I do not have the information you are looking for."
                return _get_response(response, 200)

            print("Using table", tables[0])
            try:
                # response = ask(user_input)
                response, df = ask(user_input, tables[:1])
                print("Response", response)
                return _get_response(response, 200, df)
            except Exception as e:
                print(e)
                response = "I wasn't able to assist you with your request. Please rephrase the question and try again."
                return _get_response(response, 200)
        case _:
            return https_fn.Response(status=404, response="Not Found")
