
from flask import Flask, request, jsonify
from flask_cors import CORS
import predictions
import climate_requests

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde cualquier origen (ajústalo según tu seguridad)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extraer datos del JSON recibido
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    date = data.get("date")
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    moisture = data.get("moisture")
    soil_type = data.get("soil_type")
    nitrogen = data.get("nitrogen")
    potassium = data.get("potassium")
    phosphorus = data.get("phosphorus")

    # Obtener el mes desde la fecha
    month = int(date.split("-")[1])
    month_day = f"{date.split('-')[1].zfill(2)}-{date.split('-')[2].zfill(2)}"

    # Completar datos si no están definidos
    if humidity is None:
        humidity = climate_requests.get_average_humidity(latitude, longitude, month_day)
    if moisture is None:
        moisture = climate_requests.get_average_moisture(latitude, longitude, month_day)
    if temperature is None:
        temperature = climate_requests.get_average_temperature(latitude, longitude, month_day)

    precipitation = climate_requests.get_average_precipitation(latitude, longitude, month_day)

    # Obtener predicciones
    predictions_result = predictions.getPredictions(temperature, humidity, moisture, soil_type, nitrogen, potassium, phosphorus, month)

    print({
    "predictions": predictions_result,
    "weather_data": {
        "temperature": temperature,
        "humidity": humidity,
        "moisture": moisture,
        "precipitation": precipitation,
        "soil_type": soil_type,
        "nitrogen": nitrogen,
        "potassium": potassium,
        "phosphorus": phosphorus
    }
    })

    return jsonify({
        "predictions": predictions_result,
        "weather_data": {
            "temperature": temperature,
            "humidity": humidity,
            "moisture": moisture,
            "precipitation": precipitation,
            "soil_type": soil_type,
            "nitrogen": nitrogen,
            "potassium": potassium,
            "phosphorus": phosphorus
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
