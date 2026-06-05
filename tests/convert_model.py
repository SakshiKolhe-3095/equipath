from tensorflow.keras.models import load_model

print("Loading model...")

model = load_model(
    "../src/models/ann_model_6features.h5",
    compile=False
)

print("Saving model in Keras format...")

model.save(
    "../src/models/ann_model_6features.keras"
)

print("Done!")