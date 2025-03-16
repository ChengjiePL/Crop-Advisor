#!/usr/bin/env python3
import requests

def get_soil_data(lon, lat, properties=None, depths=None, values=None):
    url = "https://rest.isric.org/soilgrids/v2.0/properties/query"
    
    if properties is None:
        properties = ["nitrogen", "phh2o"]
    if depths is None:
        depths = ["15-30cm"]
    if values is None:
        values = ["Q0.5"]
    
    params = [
        ('lon', lon),
        ('lat', lat)
    ]
    for prop in properties:
        params.append(('property', prop))
    for depth in depths:
        params.append(('depth', depth))
    for value in values:
        params.append(('value', value))
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        print("Request URL:", response.url)  # Debug: check the final URL
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching soil data:", e)
        return None

if __name__ == "__main__":
    # Use coordinates where soil data is expected
    lon = 10.0
    lat = 50.0

    soil_data = get_soil_data(lon, lat)
    if soil_data:
        print("Soil Data Response:")
        print(soil_data)
