import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from scipy.spatial.distance import euclidean

# Cargar datos
df_default = pd.read_csv('./main_data.csv')
df = pd.read_csv('./main_data.csv')

df.drop(columns=['Description', 'Image Link', 'Growth Period', 'Water Needs'], inplace=True)

# Codificar variables categóricas
label_encoders = {}
categorical_columns = ['Soil Type', 'Crop Type']
for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Se guarda X con todas las columnas usadas para el escalado
X = df.drop(columns=['Crop Type'])
# Se escala el dataset completo (aunque en la predicción usaremos solo un subconjunto)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
y = df['Crop Type']

def predict_top_k_crops(input_data, weights, k=3):
    valid_columns = [col for col in X.columns if col in input_data and input_data[col] is not None]
    X_valid = X[valid_columns]

    scaler_valid = StandardScaler()
    X_valid_scaled = scaler_valid.fit_transform(X_valid)

    input_df = pd.DataFrame([{col: input_data[col] for col in valid_columns}])
    input_valid_scaled = scaler_valid.transform(input_df)[0]

    weights_filtered = np.array([weights[X.columns.get_loc(col)] for col in valid_columns])
    weights_filtered = weights_filtered / np.sum(weights_filtered)

    distances = np.sum(np.abs(X_valid_scaled - input_valid_scaled) * weights_filtered, axis=1)

    if 'Soil Type' in valid_columns and input_data['Soil Type'] != -1:
        raw_soil = input_data['Soil Type']
        X_soil = X['Soil Type'].values
        soil_dist = np.where(X_soil == raw_soil, 0, 1)
        soil_weight = weights[X.columns.get_loc('Soil Type')]
        distances += soil_weight * soil_dist

    df['Score'] = pd.Series(np.nan_to_num(distances, nan=0.0))
    top_k = df.nsmallest(k, 'Score')

    top_k_crops = []
    for index in top_k.index:
        crop_data = df_default.iloc[index].to_dict()
        crop_data['Crop Type'] = df_default.iloc[index]['Crop Type']
        crop_data['Score'] = float(top_k.loc[index, 'Score'])
        crop_data['Quality'] = get_quality(crop_data['Score'])
        top_k_crops.append(crop_data)

    return top_k_crops

def get_quality(score):
    if score < 1.5:
        return "Excellent"
    elif score < 3:
        return "Good"
    elif score < 6:
        return "Bad"
    else:
        return "Very Bad"
    
def getPredictions(temperature, humidity, moisture, soil_type, nitrogen, potassium, phosphorus, month):
    weights = [3, 3, 3, 5, 1, 1, 1, 5]

    input_data = {
    'Temparature': temperature,
    'Humidity': humidity,
    'Moisture': moisture,
    'Soil Type': label_encoders['Soil Type'].transform([soil_type])[0] if soil_type != "" else -1,  # Usar -1 para representar "todos"
    'Nitrogen': nitrogen,
    'Potassium': potassium,
    'Phosphorous': phosphorus,
    'Month': month
    }
    
    best_crops = predict_top_k_crops(input_data, weights, k=12)
    return best_crops
