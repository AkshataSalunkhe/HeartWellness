from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import pandas as pd
from src.pipeline.predict_pipeline import PredictPipeline

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/prediction.html')
def prediction():
    return render_template('prediction.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = pd.DataFrame([data])  # Convert the received JSON data into a DataFrame
        prediction_pipeline = PredictPipeline()
        prediction = prediction_pipeline.predict(features)
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'templates/styles.css')

@app.route('/scripts.js')
def scripts():
    return send_from_directory('.', 'templates/scripts.js')

if __name__ == "__main__":
    app.run(debug=True)
