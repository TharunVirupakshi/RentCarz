from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
# Disable CSRF protection for testing purposes
app.config['WTF_CSRF_ENABLED'] = False
# Enable CORS for all routes, allowing requests from http://localhost:5173
# Enable CORS for the entire Flask application
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

with open('lgbm_model.pkl', 'rb') as file:
    lgb_model = pickle.load(file)

@app.route('/')
def hello_world():
	return 'Hello World'   

# Define the replacement dictionaries
type_of_day_mapping = {'Afternoon': 0, 'Morning': 1, 'Night': 2, 'Evening': 3, 'Early Morning': 4, 'Late Night': 5}
season_mapping = {'Spring': 0, 'Summer': 1, 'Autumn': 2, 'Winter': 3}

#function to identify the timing of the day
def timeOfDay(n):
    if n in range(1,4):
        return 5
    elif n in range(4,7):
        return 4
    elif n in range(7,12):
        return 1
    elif n in range(12,15):
        return 0
    elif n in range(15,18):
        return 3
    elif n in range(18,25) or n == 0:
        return 2     
#function for converting the months to seasons
def monthToSeasons(x):
    if x in[9,10,11]:
        return 0
    elif x in [12,1,2]:
        return 1
    elif x in [3,4,5]:
        return 2
    elif x in [6,7,8]:
        return 3



@app.get('/predict')
@cross_origin()
def predict():
    inputDate = request.args.get('date')
    print(inputDate)

    # Convert date string to datetime object
    date = pd.to_datetime(inputDate)

   # Create a DataFrame with the extracted features
    data = pd.DataFrame({
        'year': [date.year],
        'month': [date.month],
        'day': [date.day],
        'dayOfWeek': [date.dayofweek],
        'isQuarterDate': [date.quarter],
        'isWeekend': [1 if date.dayofweek > 4 else 0],
        'hour': [date.hour],
        'typeOfDay': [ timeOfDay(date.hour)],
        'Season': [monthToSeasons(date.month)],
    })

    data['hour_sin'] = np.sin(data['hour']*(2.*np.pi/24))
    data['hour_cos'] = np.cos(data['hour']*(2.*np.pi/24))
    data['month_sin'] = np.sin(data['month']*(2.*np.pi/12))
    data['month_cos'] = np.cos(data['month']*(2.*np.pi/12))
    data['dayOfWeek'] = np.cos(data['dayOfWeek'])

    # Assuming 'data' is your DataFrame
    desired_order = ['day','dayOfWeek', 'isWeekend', 'typeOfDay', 'Season', 
                    'hour_sin', 'hour_cos', 'month_sin', 'month_cos']

    # Reorder the columns
    data = data.reindex(columns=desired_order)
    print(data)
    try:
        # Predict
        prediction = lgb_model.predict(data)
        print("Prediction successful!")
        res = {"demand": prediction.tolist(), "info": data.to_dict(orient='records')}
        
        response = jsonify(res)
        
        return response
    except Exception as e:
        print("Error during prediction:", e)
        response = jsonify({"error": str(e)})
            
        return response

if __name__ == '__main__':
	app.run(debug=True)
