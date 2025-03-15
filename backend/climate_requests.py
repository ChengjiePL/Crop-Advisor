import requests
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta


def get_weather(latitude, longitude, weather_variable, start_date, end_date):
    url = "https://archive-api.open-meteo.com/v1/archive"
    
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": weather_variable,
        "timezone": "auto"
    }

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        hourly_data = data.get("hourly", {})

        if not hourly_data:
            print("No se encontraron datos en el rango de fechas proporcionado.")
            return None

        df = pd.DataFrame({
            "date": pd.to_datetime(hourly_data["time"]),
            weather_variable: hourly_data[weather_variable]
        })
        
        return df
    else:
        print(f"Error al obtener datos: {response.status_code}")
        return None

def average_temperature(df):
    if df is None or df.empty:
        print("No hay datos para calcular la temperatura media.")
        return None
    return df["temperature_2m"].mean()

def average_relative_humidity_2m(df):
    if df is None or df.empty:
        print("No hay datos para calcular la humedad relativa media.")
        return None
    return df["relative_humidity_2m"].mean()

def average_precipitation(df):
    if df is None or df.empty:
        print("No hay datos para calcular la precipitación media.")
        return None
    return df["precipitation"].mean()

def average_soil_moisture(df):
    if df is None or df.empty:
        print("No hay datos para calcular la humedad del suelo media.")
        return None
    return df["soil_moisture_0_to_7cm"].mean()


def get_average_precipitation(lat, lon, date):
    start_date_str  = f"2024-{date}"
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = start_date + relativedelta(months=1)
    
    end_date_str = f"{end_date.year}-{end_date.month:02d}-{end_date.day:02d}"
    anio, mes, dia = end_date_str.split("-")
    end_date_str = f"{anio}-{mes.zfill(2)}-{dia.zfill(2)}"
    print(start_date_str + ", " + end_date_str)  

    variable = "precipitation"
    df_weather = get_weather(lat, lon, variable, start_date_str, end_date_str)
    return average_precipitation(df_weather)

def get_average_humidity(lat, lon, date):
    start_date_str  = f"2024-{date}"
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = start_date + relativedelta(months=1)
    
    end_date_str = f"{end_date.year}-{end_date.month:02d}-{end_date.day:02d}"
    anio, mes, dia = end_date_str.split("-")
    end_date_str = f"{anio}-{mes.zfill(2)}-{dia.zfill(2)}"
    print(start_date_str + ", " + end_date_str)  

    variable = "relative_humidity_2m"
    df_weather = get_weather(lat, lon, variable, start_date_str, end_date_str)
    return average_relative_humidity_2m(df_weather)

def get_average_moisture(lat, lon, date):
    start_date_str  = f"2024-{date}"
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = start_date + relativedelta(months=1)
    
    end_date_str = f"{end_date.year}-{end_date.month:02d}-{end_date.day:02d}"
    anio, mes, dia = end_date_str.split("-")
    end_date_str = f"{anio}-{mes.zfill(2)}-{dia.zfill(2)}"
    print(start_date_str + ", " + end_date_str)  

    variable = "soil_moisture_0_to_7cm"
    df_weather = get_weather(lat, lon, variable, start_date_str, end_date_str)
    return average_soil_moisture(df_weather)

def get_average_temperature(lat, lon, date):
    start_date_str  = f"2024-{date}"
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = start_date + relativedelta(months=1)
    
    end_date_str = f"{end_date.year}-{end_date.month:02d}-{end_date.day:02d}"
    anio, mes, dia = end_date_str.split("-")
    end_date_str = f"{anio}-{mes.zfill(2)}-{dia.zfill(2)}"
    print(start_date_str + ", " + end_date_str)  

    variable = "temperature_2m"
    df_weather = get_weather(lat, lon, variable, start_date_str, end_date_str)
    return average_temperature(df_weather)
