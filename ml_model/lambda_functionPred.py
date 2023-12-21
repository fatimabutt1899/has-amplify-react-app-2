from flask import Flask, jsonify, request
import joblib
import boto3
from datetime import datetime, timedelta
import time
# import schedule

app = Flask(__name__)

# Load your pre-trained model
model = joblib.load('svm_trained_model_MAIN.joblib')
# model = joblib.load('rf_model.joblib')
# model = joblib.load('logreg_model.joblib')

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DeviceTimeStamp-zvvc26kofnethfd47fmdbb2skm-dev')

# Initialize Timestream Write client
timestream_write = boto3.client('timestream-write', region_name='us-west-2')
timestream_query = boto3.client('timestream-query', region_name='us-west-2')

# SNS Topic ARN
sns_topic_arn = 'arn:aws:sns:us-west-2:037767305626:has_fyp_sns'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json(force=True)

        # Extract required fields from timestamp
        timestamp = data.get('timestamp', '')
        hour = datetime.fromisoformat(timestamp).hour
        minute = datetime.fromisoformat(timestamp).minute

        print("hour ",hour, "minute ",minute)
        # Add required fields to features
        features = [
            data['userID'],
            data['deviceID'],
            hour,
            minute
        ]

        # Perform prediction
        prediction = model.predict([features])

        # Update Timestream
        update_timestream(data['deviceID'], data['userID'], timestamp, prediction[0])

        # Send SNS notification
        # send_sns_notification(data['deviceID'], data['userID'], timestamp, prediction[0])

        print(f"Received data: {data}")
        print(f"Features for prediction: {features}")
        print('prediction : ',prediction)
        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)})

def update_timestream(device_id, user_id, timestamp, event_status):
    try:
        # Convert timestamp string to datetime object
        timestamp_datetime = datetime.fromisoformat(timestamp)

        # Add one day to the timestamp
        modified_timestamp = timestamp_datetime + timedelta(days=1)

        # Format modified timestamp for Timestream
        formatted_modified_timestamp = modified_timestamp.strftime('%Y-%m-%d %H:%M:%S.%f')

        # Write to Timestream
        timestream_write.write_records(
            DatabaseName='has_fyp_timestampDB',
            TableName='has_fyp_timestamp_Table',
            Records=[
                {
                    'Dimensions': [
                        {'Name': 'deviceID', 'Value': device_id},
                        {'Name': 'userID', 'Value': user_id},
                        {'Name': 'timestamp', 'Value': formatted_modified_timestamp}
                    ],
                    'MeasureName': 'eventStatus',
                    'MeasureValue': str(event_status),
                    'MeasureValueType': 'BOOLEAN',
                    'Time': str(int(time.time() * 1000))
                }
            ]
        )

    except Exception as e:
        print(f"Error writing to Timestream: {str(e)}")




# def send_sns_notification(device_id, user_id, timestamp, event_status):
#     try:
#         # SNS Topic ARN
#         sns_topic_arn = 'arn:aws:sns:us-west-2:037767305626:has_fyp_sns'

#         # Publish to SNS topic
#         # print('event_status isss ',event_status)

#         hour = datetime.fromisoformat(timestamp).hour
#         minute = datetime.fromisoformat(timestamp).minute
#         sns = boto3.client('sns', region_name='us-west-2')
#         if event_status == True:
#             message = f"It's {hour}:{minute} time to Switch ON Device {device_id}"  
#         elif event_status== False:
#             message = f"It's {hour}:{minute} time to Switch OFF Device {device_id}" 

#         # message = f"Notification: EventStatus '{event_status}' for DeviceID '{device_id}' at Timestamp '{timestamp}'"
#         sns.publish(TopicArn=sns_topic_arn, Message=message)

#     except Exception as e:
#         print(f"Error sending SNS notification: {str(e)}")


if __name__ == '__main__':
    app.run(port=5000, debug=True)
