import tensorflow as tf
from tensorflow import keras

model = keras.models.load_model(
    "../src/models/ann_model_6features.h5"
)

model.save(
    "../src/models/ann_model_6features.keras"
)

print("Conversion successful")