import json

import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from web.models import Neuronus


@csrf_exempt
def predict(request):
    data = json.loads(request.body)
    values = pd.json_normalize(data)
    dalc, walc = Neuronus.predict(values)
    result = {"dalc": str(dalc), "walc": str(walc)}
    return JsonResponse(result)
