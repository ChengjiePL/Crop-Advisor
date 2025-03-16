import requests

def getLatLon(city_name):
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={city_name}"
    headers = {"User-Agent": "Mozilla/5.0"}  # Es importante agregar un User-Agent
    response = requests.get(url, headers=headers)
    data = response.json()
    if data:
        # Se devuelve la latitud y longitud del primer resultado
        lat = float(data[0]["lat"])
        lon = float(data[0]["lon"])
        return lat, lon
    else:
        return None