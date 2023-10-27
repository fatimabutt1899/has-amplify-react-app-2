

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: 'a13hdfv02qq6by-ats.iot.us-west-2.amazonaws.com' }); // Replace with your IoT endpoint

exports.handler = async (event) => {
    try {
        console.log(`EVENT: ${JSON.stringify(event)}`);
        const deviceId = event.pathParameters.deviceId;
        // const statusStr = event.pathParameters.status; // Get status as string from URL parameter
       

        const statusPath = event.pathParameters.proxy; // Extract status from pathParameters
        const status = statusPath === 'status/true'; // Convert to boolean
        const device = { 'deviceId': deviceId, 'deviceStatus': status };
        console.log("device set: ", device);


        // Send data to AWS IoT
        const iotTopic = 'home/helloworld'; // Replace with the IoT topic you want to publish to
        const iotPayload = {
            deviceId,
            status
            // Other data you want to include in the payload
        }; 
        const iotParams = {
            topic: iotTopic,
            payload: JSON.stringify(iotPayload),
            qos: 0
        };
        await iotData.publish(iotParams).promise();
        console.log('Message sent to AWS IoT:', JSON.stringify(iotPayload));
        
        return { 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                // "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(device),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify('Error sending data and updating device status.'),
        };
    }
};