# tests/test_clean_model.py

import tensorflow as tf

print("TF:", tf.__version__)

model = tf.keras.models.load_model(
    r"../src/models/ann_model_render.keras",
    compile=False
)

print("SUCCESS")
model.summary()