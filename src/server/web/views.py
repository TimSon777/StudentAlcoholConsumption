import json

import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from neuronus.neuronus import Neuronus


@csrf_exempt
def predict(request):
    data = json.loads(request.body)
    print(data)
    values = pd.json_normalize(data)
    print(values)
    walc, dalc = Neuronus.predict(values)
    result = {"walc": str(dalc), "dalc": str(walc)}
    print(result)
    return JsonResponse(result)
