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
    """
    Si alguna variable de input_data es None, se omite en el cálculo.
    Se crea un escalador nuevo para el subconjunto de columnas válidas y se ajustan los pesos.
    """
    # Determinar las columnas válidas (las que se proveen y no son None)
    valid_columns = [col for col in X.columns if col in input_data and input_data[col] is not None]
    
    # Obtener el subconjunto de X para las columnas válidas
    X_valid = X[valid_columns]
    
    # Crear y ajustar un nuevo StandardScaler para las columnas válidas
    scaler_valid = StandardScaler()
    X_valid_scaled = scaler_valid.fit_transform(X_valid)
    
    # Crear input_df solo con las columnas válidas
    input_df = pd.DataFrame([{col: input_data[col] for col in valid_columns}])
    input_valid_scaled = scaler_valid.transform(input_df)[0]
    
    # Filtrar los pesos: para cada columna válida, se toma el peso correspondiente (según el orden original de X)
    weights_filtered = np.array([weights[X.columns.get_loc(col)] for col in valid_columns])
    weights_filtered = weights_filtered / np.sum(weights_filtered)
    
    # Calcular la distancia ponderada absoluta para las variables válidas
    distances = np.sum(np.abs(X_valid_scaled - input_valid_scaled) * weights_filtered, axis=1)
    
    # Si 'Soil Type' está en las columnas válidas, tratarla como categórica:
    if 'Soil Type' in valid_columns:
        # Se obtiene el valor crudo para 'Soil Type' en el input
        raw_soil = input_data['Soil Type']
        # Se obtienen los valores crudos de 'Soil Type' en el dataset original X
        X_soil = X['Soil Type'].values
        # Se define la distancia: 0 si son iguales, 1 si son distintas
        soil_dist = np.where(X_soil == raw_soil, 0, 1)
        # Se agrega al cálculo la distancia de 'Soil Type' con su peso (tomado de la lista original)
        soil_weight = weights[X.columns.get_loc('Soil Type')]
        distances += soil_weight * soil_dist

    # Guardar los scores en df (las filas corresponden a las mismas que en X)
    df['Score'] = distances
    df['Score'] = df['Score'].fillna(0)
    
    # Seleccionar los k cultivos con menor distancia (más similares)
    top_k = df.nsmallest(k, 'Score')
    
    # Recuperar la información original de df_default y agregar el Score
    top_k_crops = []
    for index in top_k.index:
        crop_data = df_default.iloc[index].to_dict()
        crop_data['Crop Type'] = df_default.iloc[index]['Crop Type']  # nombre original del cultivo
        crop_data['Score'] = float(top_k.loc[index, 'Score'])
        top_k_crops.append(crop_data)
    
    return top_k_crops

def getPredictions(temperature, humidity, moisture, soil_type, nitrogen, potassium, phosphorus, month):
    weights = [3, 3, 3, 5, 1, 1, 1, 5]

    input_data = {
    'Temparature': temperature,
    'Humidity': humidity,
    'Moisture': moisture,
    'Soil Type': label_encoders['Soil Type'].transform([soil_type])[0],
    'Nitrogen': nitrogen,
    'Potassium': potassium,
    'Phosphorous': phosphorus,
    'Month': month
    }
    
    best_crops = predict_top_k_crops(input_data, weights, k=3)
    return best_crops