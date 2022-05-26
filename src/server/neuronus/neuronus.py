import os
from keras.models import load_model
import numpy as np

from neuronus.init_model import train_model


class Neuronus:
    model = 0

    @staticmethod
    def initModel():
        if not os.path.exists("weight"):
            train_model()
        Neuronus.model = load_model("weight", compile=False)


    @staticmethod
    def parse_date(data):
        data['sex'] = data['sex'].map({'F': 0, 'M': 1})
        data['address'] = data['address'].map({'U': 0, 'R': 1})
        data['Pstatus'] = data['Pstatus'].map({'T': 0, 'A': 1})
        data['famsup'] = data['famsup'].map({'no': 0, 'yes': 1})
        data['activities'] = data['activities'].map({'no': 0, 'yes': 1})
        data['romantic'] = data['romantic'].map({'no': 0, 'yes': 1})

    @staticmethod
    def predict(data):
        Neuronus.parse_date(data)
        print(data)
        predict = np.array(Neuronus.model.predict(data))
        print(predict)
        return predict[0][0], predict[0][1]
