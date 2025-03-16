import os
import pandas as pd

def get_crop_info(crop_name):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'main_data.csv')
    
    df = pd.read_csv(csv_path)
    
    df_filtered = df[df['Crop Type'].str.lower() == crop_name.lower()]
    
    if df_filtered.empty:
        return {}
    
    return df_filtered.iloc[0].to_dict()