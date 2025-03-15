from flask import Flask, request, jsonify
from flask_cors import CORS
import openmeteo_requests
import requests_cache
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from retry_requests import retry

app = Flask(__name__)
CORS(app)  # Enable CORS

def get_weather(latitude, longitude, weather_variable, start_date, end_date):
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)
    
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": weather_variable,
        "start_date": start_date,
        "end_date": end_date,
    }
    
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]
    
    hourly = response.Hourly()
    hourly_values = hourly.Variables(0).ValuesAsNumpy()
    
    hourly_data = {
        "date": pd.date_range(
            start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left"
        )
    }
    hourly_data[weather_variable] = hourly_values

    df = pd.DataFrame(hourly_data)
    df['date'] = df['date'].dt.strftime('%Y-%m-%d %H:%M')
    return df

def plot_weather(df, weather_variable):
    plt.figure(figsize=(10, 5))
    plt.plot(df['date'], df[weather_variable], marker='o', linestyle='-', color='b')
    plt.title(f'{weather_variable.replace("_", " ").title()} Forecast')
    plt.xlabel('Date')
    plt.ylabel(weather_variable.replace("_", " ").title())
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()
    return encoded

@app.route('/api/weather', methods=['POST'])
def weather_api():
    data = request.get_json()
    try:
        df = get_weather(
            data['latitude'],
            data['longitude'],
            data['weather_variable'],
            data['start_date'],
            data['end_date']
        )
        return jsonify({
            "data": df.to_dict(orient='records'),
            "plot": plot_weather(df, data['weather_variable'])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)
