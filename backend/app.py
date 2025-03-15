from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa flask-cors
import predictions
import climate_requests

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    lat = data.get("latitude")
    lon = data.get("longitude")
    date = data.get("date")
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    moisture = data.get("moisture")
    soil_type = data.get("soil_type")
    nitrogen = data.get("nitrogen")
    potassium = data.get("potassium")
    phosphorus = data.get("phosphorus")

    print(temperature)
    print(humidity)

    ###
    lat = 26.244159
    lon = -98.245178

    date = "2024-9-8"

    humidity = 55
    moisture = 30
    soil_type = 'Arenoso'
    nitrogen = 30
    potassium = None
    phosphorus = None
    ###

    month = int(date.split("-")[1])
    anio, mes, dia = date.split("-")
    month_day = f"{mes.zfill(2)}-{dia.zfill(2)}"

    if humidity is None:
        humidity = climate_requests.get_average_humidity(lat, lon, month_day)
    if moisture is None:
        moisture = climate_requests.get_average_moisture(lat, lon, month_day)
    if temperature is None:
        temperature = climate_requests.get_average_temperature(lat, lon, month_day)

    precipitation = climate_requests.get_average_precipitation(lat, lon, month_day)

    pred = predictions.getPredictions(temperature, humidity, moisture, soil_type, nitrogen, potassium, phosphorus, month)

    response = {
        "predictions": pred,
        "climate_data": {
            "precipitation": precipitation,
            "temperature": temperature,
            "humidity": humidity,
            "moisture": moisture,
            "soil_type": soil_type,
            "nitrogen": nitrogen,
            "potassium": potassium,
            "phosphorus": phosphorus
        }
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
