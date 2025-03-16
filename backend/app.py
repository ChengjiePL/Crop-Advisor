
from flask import Flask, request, jsonify
from flask_cors import CORS
import predictions
import climate_requests
import location_requests

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

    city = data.get("city")
    print()
    print(city)
    print()
    # Obtener el mes desde la fecha
    month = int(date.split("-")[1])
    month_day = f"{date.split('-')[1].zfill(2)}-{date.split('-')[2].zfill(2)}"

    latitude, longitude = location_requests.getLatLon(city)

    # Completar datos si no están definidos
    predicted_humidity = ""
    predicted_moisture = ""
    predicted_temperature = ""
    if humidity is None:
        predicted_humidity = " (predicted) "
        humidity = climate_requests.get_average_humidity(latitude, longitude, month_day)
    if moisture is None:
        predicted_moisture = " (predicted) "
        moisture = climate_requests.get_average_moisture(latitude, longitude, month_day)
    if temperature is None:
        predicted_temperature = " (predicted) "
        temperature = climate_requests.get_average_temperature(latitude, longitude, month_day)

    precipitation = climate_requests.get_average_precipitation(latitude, longitude, month_day)

    # Obtener predicciones
    predictions_result = predictions.getPredictions(temperature, humidity, moisture, soil_type, nitrogen, potassium, phosphorus, month)
    
    return jsonify({
        "predictions": predictions_result,
        "weather_data": {
            "temperature": str(str(round(temperature, 2)) + predicted_temperature),
            "humidity": str(str(round(humidity, 2)) + predicted_humidity),
            "moisture": str(str(round(moisture, 2)) + predicted_moisture),
            "precipitation": round(precipitation, 2),
            "soil_type": soil_type,
            "nitrogen": nitrogen,
            "potassium": potassium,
            "city": city + " (lat: " + str(round(latitude, 4)) + ", lon: " + str(round(longitude, 4)) + ")",
            "phosphorus": phosphorus
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
