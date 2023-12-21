from flask import Flask
import schedule
import time
import boto3
from datetime import datetime, timedelta
import pytz

app = Flask(__name__)

# Initialize Timestream Write client
timestream_query = boto3.client('timestream-query', region_name='us-west-2')

# SNS Topic ARN
sns_topic_arn = 'arn:aws:sns:us-west-2:037767305626:has_fyp_sns'

def execute_timestream_query(query):
    try:
        response = timestream_query.query(QueryString=query)
        res = response.get('Rows', [])
        return res

    except Exception as e:
        print(f"Error executing Timestream query: {str(e)}")
        return None

def send_scheduled_notification():
    try:
        print("\n Working --------------------------")
        # Determine the timestamp range for the query (e.g., previous day)

        # Set the time zone for Pakistan
        pakistan_timezone = pytz.timezone('Asia/Karachi')

        # Get the current UTC time
        end_timestamp_utc = datetime.utcnow()

        end_timestamp_pakistan = end_timestamp_utc.replace(tzinfo=pytz.utc).astimezone(pakistan_timezone)

        # Calculate the start time (6 hours ago)
        # start_timestamp_pakistan = end_timestamp_pakistan - timedelta(hours=5, days=1)
        start_timestamp_pakistan = end_timestamp_pakistan - timedelta(hours=5)

        # Format the timestamps for the Timestream query
        formatted_start_timestamp = start_timestamp_pakistan.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3] + '000000'

        # Use the formatted timestamps in your Timestream query
        timestream_query_string = (
            f"SELECT \"deviceID\", \"userID\", \"timestamp\", "
            f"\"measure_name\", \"time\", \"measure_value::boolean\" "
            f"FROM \"has_fyp_timestampDB\".\"has_fyp_timestamp_Table\" "
            f"WHERE time >= '{formatted_start_timestamp}' - interval '2' second AND time <= '{formatted_start_timestamp}'"
        )

        print('formatted_start_timestamp pakistani: ', formatted_start_timestamp, "\n")
        print('timestream_query_string : ', timestream_query_string, "\n")
        results = execute_timestream_query(timestream_query_string)
        print('\nResults-------:', results, "\n")

        if results is not None:
            for row in results:
                # Access values by their order in the result
                formatted_time_value = None  # Initialize here
                try:
                    device_id = row.get('Data')[0].get('ScalarValue', '')
                    user_id = row.get('Data')[1].get('ScalarValue', '')
                    timestamp = row.get('Data')[2].get('ScalarValue', '') # timestamp
                    measure_name = row.get('Data')[3].get('ScalarValue', '')
                    time_value = row.get('Data')[4].get('ScalarValue', '') # time

                    # Parse the timestamp and time_value
                    try:
                        timestamp = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S.%f')
                        time_value = datetime.strptime(time_value.split(".")[0], '%Y-%m-%d %H:%M:%S')
                    except ValueError:
                        print(f"Error converting timestamp or time_value: {timestamp}, {time_value}")
                        continue

                    # Convert the time_value to the same format as formatted_start_timestamp
                    formatted_time_value = time_value.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3] + '000000'

                    measure_value = row.get('Data')[5].get('ScalarValue', '')

                    print('device_id:', device_id)
                    print('user_id:', user_id)
                    print('timestamp:', timestamp)
                    print('measure_name:', measure_name)
                    print('time_value:', formatted_time_value)  # Print or process the 'time' column value
                    print('measure_value:', measure_value)
                except Exception as e:
                    print(f"Error processing row: {str(e)}")

                if formatted_time_value is not None:  # Check if formatted_time_value is assigned
                    send_results_to_sns(device_id, timestamp, measure_value)

    except Exception as e:
        print(f"Error sending scheduled notification: {str(e)}")


def send_results_to_sns(device_id, timestamp, measure_value):
    try:
        action_message = (
            f"For DeviceID '{device_id}' at Timestamp '{timestamp}', "
            f"{'Switch On' if measure_value == 'true' else 'Switch Off'} the device."
        )

        sns = boto3.client('sns', region_name='us-west-2')
        sns.publish(TopicArn=sns_topic_arn, Message=action_message)

    except Exception as e:
        print(f"Error sending results to SNS: {str(e)}")

# Schedule the task to run every minute (adjust as needed)
schedule.every(1).seconds.do(send_scheduled_notification)

if __name__ == '__main__':
    while True:
        schedule.run_pending()
        time.sleep(1)
