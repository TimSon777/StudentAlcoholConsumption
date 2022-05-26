import pathlib

import numpy as np
import pandas as pd

from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Activation, Dropout, Normalization, Lambda, Input
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.datasets import mnist
from keras.utils import np_utils
from sklearn.model_selection import train_test_split

import tensorflow as tf

import matplotlib.pyplot as plt

from math import fabs
from pathlib import Path


class Neuronus:
    model = 0

    @staticmethod
    def parse_date(data):
        data['sex'] = data['sex'].map({'F': 0, 'M': 1})
        data['address'] = data['address'].map({'U': 0, 'R': 1})
        data['Pstatus'] = data['Pstatus'].map({'T': 0, 'A': 1})
        data['famsup'] = data['famsup'].map({'no': 0, 'yes': 1})
        #data['paid'] = data['paid'].map({'no': 0, 'yes': 1})
        data['activities'] = data['activities'].map({'no': 0, 'yes': 1})
        data['romantic'] = data['romantic'].map({'no': 0, 'yes': 1})

    @staticmethod
    def read_data():
        work_path = pathlib.Path.cwd()
        path_student_mat = Path(work_path, "web", "data_set", "student-mat.csv")
        path_student_por = Path(work_path, "web", "data_set", "student-por.csv")
        df1 = pd.read_csv(path_student_mat)
        df2 = pd.read_csv(path_student_por)

        data = pd.concat([df1, df2]).drop(
            columns=['school', 'famsize', 'Medu', 'Fedu', 'Mjob', 'Fjob', 'guardian', 'reason', 'G1', 'G2', 'G3',
                     'higher', 'schoolsup', 'nursery', 'internet', 'paid'])

        Neuronus.parse_date(data)

        data['Walc'] = data['Walc'] / 5
        data['Dalc'] = data['Dalc'] / 5

        return data.drop(columns=['Dalc', 'Walc']), data[['Dalc', 'Walc']]

    @staticmethod
    def init_model():
        inputs = Input(shape=(15,), name='input')
        x = Normalization()(inputs)
        x = Dense(30, activation='relu')(x)
        x = Dense(30, activation='relu')(x)
        x = Dense(30, activation='relu')(x)
        x = Dropout(0.3)(x)
        out = Dense(2, activation='sigmoid')(x)
        return Model(inputs, out)

    @staticmethod
    def learn():
        X, Y = Neuronus.read_data()
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=9)
        print(X_test)

        model = Neuronus.init_model()

        model.compile(optimizer=RMSprop(learning_rate=0.01, rho=0.9), loss='mse')
        model.fit(X_train, Y_train[['Dalc', 'Walc']], epochs=2000, verbose=True,
                  callbacks=EarlyStopping(monitor='val_loss', patience=50), batch_size=50,
                  validation_split=0.2)
        Neuronus.model = model

    @staticmethod
    def predict(data):
        Neuronus.parse_date(data)
        predict = np.array(Neuronus.model.predict(data))
        return predict[0][0], predict[0][1]
