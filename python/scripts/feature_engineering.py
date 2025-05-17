import pandas as pd
from sklearn.preprocessing import LabelEncoder

def preprocess_data(data):
    """Preprocess the data, handling categorical feature and missing values."""
    
    #convert data column to datetime
    data['date'] = pd.to_datetime(data['date'], errors='coerce')

    # Extract features like month and weeekday form the date
    data['month'] = data['date'].dt.month
    data['weekday'] = data['date'].dt.weekday

    # Encode all categorical string columns
    label_encoders = {}
    for col in ['day_of_week', 'weather', 'special_event']:
        le = LabelEncoder()
        data[col] = le.fit_transform(data[col].astype(str))
        label_encoders[col] = le

        
    # Forward fill any missing values if any
    data.ffill(inplace=True)

    return data