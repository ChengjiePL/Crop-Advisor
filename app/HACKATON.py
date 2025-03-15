import openmeteo_requests
import requests_cache
import pandas as pd
import matplotlib.pyplot as plt
from retry_requests import retry

def get_weather(latitude, longitude, weather_variable, start_date, end_date):
    # Configurar la sesión con caché y reintentos
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)
    
    # Parámetros para la consulta
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": weather_variable,
        "start_date": start_date,
        "end_date": end_date,
    }
    
    # Realizar la consulta a la API
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]
    
    # Mostrar información general
    print(f"Coordenadas: {response.Latitude()}°N, {response.Longitude()}°E")
    print(f"Elevación: {response.Elevation()} m sobre el nivel del mar")
    print(f"Zona horaria: {response.Timezone()}{response.TimezoneAbbreviation()}")
    print(f"Diferencia con GMT+0: {response.UtcOffsetSeconds()} s")
    
    # Procesar datos horarios
    hourly = response.Hourly()
    hourly_values = hourly.Variables(0).ValuesAsNumpy()
    
    # Crear un rango de fechas dentro del intervalo solicitado
    hourly_data = {
        "date": pd.date_range(
            start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left"
        )
    }
    hourly_data[weather_variable] = hourly_values

    df = pd.DataFrame(data=hourly_data)

    # Filtrar solo el rango de fechas especificado por el usuario
    df = df[(df['date'] >= start_date) & (df['date'] <= end_date)]
    
    return df

def plot_weather(df, weather_variable):
    plt.figure(figsize=(10, 5))
    plt.plot(df['date'], df[weather_variable], marker='o', linestyle='-', color='b')
    plt.title(f'Pronóstico de {weather_variable} entre {df["date"].min().date()} y {df["date"].max().date()}')
    plt.xlabel('Fecha')
    plt.ylabel(weather_variable)
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    # Solicitar datos de entrada al usuario
    lat = float(input("Ingrese la latitud (por ejemplo, 52.52): "))
    lon = float(input("Ingrese la longitud (por ejemplo, 13.41): "))
    variable = input("Ingrese la variable meteorológica (por ejemplo, 'temperature_2m'): ")
    start_date = input("Ingrese la fecha de inicio (YYYY-MM-DD): ")
    end_date = input("Ingrese la fecha de fin (YYYY-MM-DD): ")
    
    # Obtener datos meteorológicos
    df_weather = get_weather(lat, lon, variable, start_date, end_date)
    print("\nResultados del pronóstico:")
    print(df_weather)
    
    # Mostrar gráfico del pronóstico
    plot_weather(df_weather, variable)
