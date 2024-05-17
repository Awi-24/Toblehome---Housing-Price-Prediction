from flask import Flask, request, jsonify
from sklearn.preprocessing import RobustScaler, LabelEncoder
from keras.models import load_model
import pandas as pd
import joblib

app = Flask(__name__)

# Carregar o modelo pré-treinado e os objetos de pré-processamento
model = load_model('Training_Model\house_price_model.h5')
scaler = joblib.load('Training_Model\scaler.pkl')
label_encoders = joblib.load('Training_Model\label_encoders.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        data['HouseType'],
        data['LotSize'],
        data['Balcony'],
        data['LivingSpace'],
        data['NumberRooms'],
        data['YearBuilt'],
        data['PostalCode']
    ]
    # Converter as características em um DataFrame
    df = pd.DataFrame([features], columns=['HouseType', 'LotSize', 'Balcony', 'LivingSpace', 'NumberRooms', 'YearBuilt', 'PostalCode'])
    # Pré-processamento das variáveis numéricas
    numeric_columns = ['LotSize', 'LivingSpace', 'NumberRooms', 'YearBuilt', 'PostalCode']
    df[numeric_columns] = scaler.transform(df[numeric_columns])
    # Pré-processamento das variáveis categóricas
    for col, le in label_encoders.items():
        df[col] = le.transform(df[col])
    # Fazer a previsão
    prediction = model.predict(df)
    predicted_price = prediction[0][0]
    return jsonify({'prediction': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
