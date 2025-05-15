import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
from data_loader import load_data
from feature_engineering import preprocess_data

def train_model():
    """Trains the donation prediction model."""

    #load and preprocess data
    data = load_data('data/donation_data.csv')
    data = preprocess_data(data)

    #split data into features and target
    x = data[['day_of_week', 'weather', 'special_event', 'month', 'weekday']]
    y = data['donation_amount']
    
    #split the data into traning and testing sets
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    #tranin the model (Random Forest Regressor in this case)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(x_train, y_train)

    #save the model to a file
    joblib.dump(model, 'output/donation_model.pkl')

    # Check model performance on test data
    score = model.score(x_test, y_test)
    print(f"Model accuracy: {score * 100:.2f}%")



