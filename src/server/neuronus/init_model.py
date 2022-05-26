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


def train_model():
    work_path = pathlib.Path.cwd()
    path_student_mat = Path(work_path, "neuronus", "data_set", "student-mat.csv")
    path_student_por = Path(work_path, "neuronus", "data_set", "student-por.csv")
    df1 = pd.read_csv(path_student_mat)
    df2 = pd.read_csv(path_student_por)

    data = pd.concat([df1, df2]).drop(
        columns=['school', 'famsize', 'Medu', 'Fedu', 'Mjob', 'Fjob', 'guardian', 'reason', 'G1', 'G2', 'G3',
                 'higher', 'schoolsup', 'nursery', 'internet', 'paid', "absences"])

    data['sex'] = data['sex'].map({'F': 0, 'M': 1})
    data['address'] = data['address'].map({'U': 0, 'R': 1})
    data['Pstatus'] = data['Pstatus'].map({'T': 0, 'A': 1})
    data['famsup'] = data['famsup'].map({'no': 0, 'yes': 1})
    data['activities'] = data['activities'].map({'no': 0, 'yes': 1})
    data['romantic'] = data['romantic'].map({'no': 0, 'yes': 1})

    data['Walc'] = data['Walc'] / 5
    data['Dalc'] = data['Dalc'] / 5

    X, Y = data.drop(columns=['Dalc', 'Walc']), data[['Dalc', 'Walc']]
    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.01, random_state=9)

    hidden_layer_activation_func = 'relu'

    inputs = Input(shape=(14,), name='input')
    layer = Dense(30, activation=hidden_layer_activation_func)(inputs)
    layer = Dense(30, activation=hidden_layer_activation_func)(layer)
    layer = Dropout(0.3)(layer)
    out = Dense(2, activation='sigmoid')(layer)

    model = Model(inputs, out)

    model.compile(optimizer=RMSprop(learning_rate=0.01, rho=0.9), loss='mse')
    model.fit(x_train, y_train[['Dalc', 'Walc']], epochs=2000, verbose=True,
              callbacks=EarlyStopping(monitor='val_loss', patience=100), batch_size=10,
              validation_split=0.1)

    predict = np.array(model.predict(x_test))
    true_values = np.array(y_test)

    print('The average standard error: {}\n'.format(((predict - true_values) ** 2).sum() / len(predict) / 2))
    counters = [0, 0]
    for k in [1, 2, 5, 8]:
        probability = k / 10
        for i in range(len(predict)):
            for j in range(len(counters)):
                if fabs(predict[i][j] - true_values[i][j]) < probability:
                    counters[j] += 1
        for i in range(len(counters)):
            print('For column {} our model with probability {:.0f} guesses {:.3f} percent of cases'.format(['Dalc', 'Walc'][i],
                                                                                                           probability * 100,
                                                                                                           counters[i] / len(predict) * 100))
        for i in range(len(counters)):
            counters[i] = 0
        print()

    model.save("weight")
