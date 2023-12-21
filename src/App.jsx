import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {API, Amplify, Auth, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { updateDevice, listDevices,createUser } from './graphql/queries';
// import {  } from './graphql/mutations';

import {Paper} from '@mui/material/';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// import { updateDevice } from './graphql/mutations';

import * as mutations from './graphql/mutations';

import axios from 'axios';
import { handleSignUp } from './auth';

import fanOnIcon from './icons/fanOn.gif';
import fanOffIcon from './icons/fanOff.png';
import bulbOnIcon from './icons/bulbOn.png';
import bulbOffIcon from './icons/bulbOff.png'; 

import { createDeviceTimeStamp } from './graphql/mutations';

Amplify.configure(awsExports);

const apiUrl = 'https://wa21lwv9da.execute-api.us-west-2.amazonaws.com/dev';


function App() {
  const [devices, setDevices] = useState([]);

  
  useEffect(() =>{
    fetchDevices(); 
    handleSignUp();
  },[])
 
  const fetchDevices = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;
      console.log("userID: ",userId);
      const deviceData = await API.graphql(
        graphqlOperation(listDevices, {
          filter: {
            userDevicesId: { eq: userId }
          }
        })
      );
      
      console.log('deviceData', deviceData);
      const deviceList = deviceData.data.listDevices.items;
      console.log('deviceList', deviceList);
      setDevices(deviceList);
    } catch (error) {
      console.log('error on fetching devices', error);
    }
  };



  const deviceSwitch = async (idx) => {
    try {
        const device = devices[idx];
        console.log(device.status);
        
        device.status = !device.status;
        console.log(device.status);
        
        const status = device.status;
        const deviceId = device.id;

        console.log('Sending request with deviceId:', deviceId, 'and status:', status);
        const response = await axios.post(`${apiUrl}/device/${deviceId}/status/${status}`);
        console.log('API Response:', response.data);

        // New code to record device switch events
        const user = await Auth.currentAuthenticatedUser();
        const timestampEntry = {
          deviceID: deviceId,
          userID: user.attributes.sub, // Assuming user is authenticated
          timestamp: new Date().toISOString(), // Use the current timestamp
          eventStatus: status,
        };

        await API.graphql(graphqlOperation(createDeviceTimeStamp, { input: timestampEntry }));
    // End of new code

        const input1 = {
                id: device.id, // Make sure to include the device ID
                status: device.status, // Update the status
                // Add other fields if necessary
              };
        console.log(device.status);

        const deviceData = await API.graphql({query: mutations.updateDevice, variables: {input: input1}});
        console.log(device.status);
        
        const deviceList = [...devices];
        console.log(device.status);
        
        deviceList[idx] = deviceData.data.updateDevice;
        setDevices(deviceList);

    } catch (error) {
        console.log('error on switching On/Off device', error);
    }
};


  return ( 
    
        // Auth.signUp.user
          
          <Authenticator> 
            
            {/* <Authenticator className="user"></Authenticator> */}
            {({ signOut, user }) => (
              
              <main>  
                <div className="App">
                  <header className="App-header">
                    
                    <h2>Home Automation System</h2>
                    {/* <h2>Hello {user.attributes.email}</h2> */}
                    <button onClick={signOut}>Sign out</button>
                  </header>
                  <div className='deviceList'>
                    {devices.map((device, idx) =>{

                          const AntSwitch = styled(Switch)(({ theme }) => ({
                            width: 28,
                            height: 16,
                            padding: 0,
                            display: 'flex',
                            '&:active': {
                              '& .MuiSwitch-thumb': {
                                width: 15,
                              },
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                transform: 'translateX(9px)',
                              },
                            },
                            '& .MuiSwitch-switchBase': {
                              padding: 2,
                              '&.Mui-checked': {
                                transform: 'translateX(12px)',
                                color: '#fff',
                                '& + .MuiSwitch-track': {
                                  opacity: 1,
                                  backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                                },
                              },
                            },
                            '& .MuiSwitch-thumb': {
                              boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              transition: theme.transitions.create(['width'], {
                                duration: 200,
                              }),
                            },
                            '& .MuiSwitch-track': {
                              borderRadius: 16 / 2,
                              opacity: 1,
                              backgroundColor:
                                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
                              boxSizing: 'border-box',
                            },
                          }));
                            
                          const handleButtonClick = async () => {
                            await handleSignUp();
                            // Additional logic after signing up, if needed.
                          };
                      return (
                        <Paper variant='outlined' elevation={0} key={`device${idx}`}>
                          <div className='deviceCard'>
                            <div className="icon">
                                {device.name === 'Fan' ? (
                                device.status ? (
                                  <img src={fanOnIcon} alt="Fan On" style={{ maxWidth: '75px', maxHeight: '75px' }}/>
                                ) : (
                                  <img src={fanOffIcon} alt="Fan Off" style={{ maxWidth: '75px', maxHeight: '75px' }}/>
                                )
                              ) : device.name === 'Led 1' || 'Led 2' || 'Led 3' ? (
                                device.status ? (
                                  <img src={bulbOnIcon} alt="Bulb On" style={{ maxWidth: '75px', maxHeight: '75px' }}/>
                                ) : (
                                  <img src={bulbOffIcon} alt="Bulb Off" style={{ maxWidth: '75px', maxHeight: '75px' }}/>
                                )
                              ) : null}
                        </div>

                            <div>
                              <div className="deviceName"><h3>{device.name}</h3></div>
                              {/* <div className="deviceID">{device.id}</div> */}
                            </div>


                          <FormGroup >
                              <Stack direction="row" spacing={1} alignItems="center"  style={{  display: 'flex',  justifyContent: 'center',  alignItems: 'center',  height: '100%' }}>
                                <Typography>Off</Typography>
                                  <AntSwitch checked={device.status} inputProps={{ 'aria-label': 'ant design' }} onClick={() => deviceSwitch(idx)}/>
                                <Typography>On</Typography>
                            </Stack>
                         </FormGroup>
                          </div>

                        </Paper>
                      )
                      
                    })} 
                  </div>

                </div>
              </main>
            )}
          </Authenticator>
          
  );
} 

export default withAuthenticator(App);

        