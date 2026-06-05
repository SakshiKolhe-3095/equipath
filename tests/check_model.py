from tensorflow.keras.models import load_model

model = load_model(
    r"D:\Admin\Projects\equipath\src\models\ann_model_6features.keras",
    compile=False
)

print("SUCCESS")