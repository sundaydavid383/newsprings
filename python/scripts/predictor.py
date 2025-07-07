import joblib 
import os
import pandas as pd
from feature_engineering import preprocess_data


print("Current working directory:", os.getcwd())

def predict_donations(input_data):
    """Predict the donation amount based on input features"""
    
    # Load trained model
    print("🔄 Loading model...")
    model_path = os.path.join(os.path.dirname(__file__), '..', 'output', 'donation_model.pkl')
    model = joblib.load(model_path)
    print("✅ Model loaded successfully.")
    

    # Preprocess input
    print("🔄 Preprocessing input data...")
    input_data = preprocess_data(input_data)
    print("✅ Data preprocessing complete.") 

    # Extract relavant features
    x_input = input_data[['day_of_week', 'weather', 'special_event', 'month', 'weekday']]

    # make prediction
    print("🔮 Making prediction...") 
    prediction = model.predict(x_input)

    return prediction


# ==== TESTING THE PREDICTOR WITH SAMPLE DATA ===
if __name__ == "__main__":
    sample_data = pd.DataFrame({
        'date':['2025-05-17'],
        'day_of_week': ['Saturday'],
        'weather': ['Sunny'],
        'special_event': ['Youth Revival'],
        'donation_amount': [0] # placeholder, not used in prediction
    })

    result = predict_donations(sample_data)
    print(f"Predicted Donation Amount: #{result[0]:,.2f}")



