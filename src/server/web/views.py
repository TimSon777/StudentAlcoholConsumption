"""
import json

import pandas as pd

from web.models import Neuronus


def predict(request):
    data = json.load(request.body)
    values = pd.DataFrame(data)
    return Neuronus.predict(values)
"""
