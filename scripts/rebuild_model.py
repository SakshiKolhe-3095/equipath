# scripts/rebuild_model.py
import h5py
import numpy as np
import tensorflow as tf

# --- Extract weights directly from HDF5 ---
weights = []
with h5py.File("src/models/ann_model_6features.h5", "r") as f:
    # Walk layer groups in order
    model_weights = f["model_weights"]
    for layer_name in model_weights:
        layer = model_weights[layer_name]
        for weight_name in layer:
            weights.append(np.array(layer[weight_name]))

# --- Rebuild arch from scratch ---
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(6,)),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Build model so layers have weights
model.build((None, 6))

# --- Assign weights ---
model.set_weights(weights)

# --- Save clean ---
model.save("src/models/ann_model_clean.keras")
print("Done. Weights:", len(weights))