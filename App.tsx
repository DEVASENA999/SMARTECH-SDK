import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import SmartechReact from 'smartech-base-react-native';
import SmartechPushReact from 'smartech-push-react-native';
import SmartechBaseReact from 'smartech-base-react-native';

const App = () => {
    const [userIdentity, setUserIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Initialize user when the app loads
        initializeUser('user123');

        // Track an event when the app launches
        trackEvent('App Launched', { platform: 'React Native' });

        // Define the handler function for deeplinks
        const handleDeeplinkWithPayload = (smartechData) => {
            console.log('Smartech Data :: ', smartechData);
            console.log('Smartech Deeplink :: ', smartechData.smtDeeplink);
            console.log('Smartech CustomPayload:: ', smartechData.smtCustomPayload);
        };

        // Define the handler function for notification received
        const handleOnNotificationReceived = (notificationData) => {
            console.log('Notification Data :: ', notificationData);
        };

        // Add listener for Smartech Deeplink
        SmartechReact.addListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);

        // Add listener for Smartech Notification Received
        SmartechPushReact.addListener(SmartechPushReact.SmartechNotificationReceived, handleOnNotificationReceived);

        // Cleanup the listeners on component unmount
        return () => {
            SmartechReact.removeListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);
            SmartechPushReact.removeListener(SmartechPushReact.SmartechNotificationReceived, handleOnNotificationReceived);
        };
    }, []);

    const initializeUser = (userId) => {
        SmartechBaseReact.setUserIdentity(userId);
        SmartechBaseReact.setUserProfile({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890"
        });
    };

    const trackEvent = (eventName, eventData) => {
        SmartechBaseReact.trackEvent(eventName, eventData);
    };

    const handleLogin = () => {
        // Perform login validation here
        if (userIdentity && password) {
            // Set the user's identity
            SmartechBaseReact.setUserIdentity(userIdentity, (error, result) => {
                if (error) {
                    console.log('Error setting user identity:', error);
                } else {
                    console.log('User identity set successfully:', result);

                    // Call Smartech login method
                    SmartechBaseReact.login(userIdentity);

                    // Update user profile with additional information
                    const payloadData = {
                        FIRST_NAME: "John",
                        LAST_NAME: "Doe",
                        AGE: "30",
                        COUNTRY: "USA",
                        STATE: "California",
                        CITY: "San Francisco",
                        PINCODE: "94107"
                    };

                    SmartechBaseReact.updateUserProfile(payloadData, 
                        (response) => {
                            console.log('User profile updated successfully:', response);
                        },
                        (error) => {
                            console.log('Error updating user profile:', error);
                        }
                    );

                    // Track login event
                    trackEvent('User Logged In', { userIdentity });
                    
                    setIsLoggedIn(true);
                }
            });
        } else {
            console.log('Please enter valid credentials');
        }
    };

    const handleLogout = () => {
        // Logout the user and clear identity
        SmartechBaseReact.logoutAndClearUserIdentity(true);
        setIsLoggedIn(false);
        setUserIdentity('');
        setPassword('');
        console.log('User logged out and identity cleared');
        
        // Track logout event
        trackEvent('User Logged Out');
    };

    const optOutPushNotification = () => {
        // Opt-out for push notifications
        SmartechPushReact.optPushNotification(false);
        console.log('Opted out for push notifications');
    };

    const optInPushNotification = () => {
        // Opt-in for push notifications
        SmartechPushReact.optPushNotification(true);
        console.log('Opted in for push notifications');
    };

    const optOutInAppMessage = () => {
        // Opt-out for in-app messages
        SmartechBaseReact.optInAppMessage(false);
        console.log('Opted out for in-app messages');
    };

    const optInInAppMessage = () => {
        // Opt-in for in-app messages
        SmartechBaseReact.optInAppMessage(true);
        console.log('Opted in for in-app messages');
    };

    const checkPushNotificationConsent = () => {
        // Check current consent status for push notifications
        SmartechPushReact.hasOptedPushNotification((status) => {
            console.log('Push notification consent status:', status);
        });
    };

    const checkInAppMessageConsent = () => {
      // Check current consent status for in-app messages
      SmartechBaseReact.hasOptedInAppMessage((status) => {
          console.log('In-app message consent status:', status);
      });
  };

  if (isLoggedIn) {
      return (
          <View>
              <Text>Welcome to React Native!</Text>
              <Button title="Logout" onPress={handleLogout} />
          </View>
      );
  } else {
      return (
          <View>
              <TextInput
                  placeholder="Enter User Identity"
                  value={userIdentity}
                  onChangeText={setUserIdentity}
              />
              <TextInput
                  placeholder="Enter Password"
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
              />
              <Button title="Login" onPress={handleLogin} />
              <Button title="Opt Out Push Notification" onPress={optOutPushNotification} />
              <Button title="Opt In Push Notification" onPress={optInPushNotification} />
              <Button title="Opt Out In-App Message" onPress={optOutInAppMessage} />
              <Button title="Opt In In-App Message" onPress={optInInAppMessage} />
              <Button title="Check Push Notification Consent" onPress={checkPushNotificationConsent} />
              <Button title="Check In-App Message Consent" onPress={checkInAppMessageConsent} />
          </View>
      );
  }
};

export default App;
