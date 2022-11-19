import React from 'react';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CourseListing, Dashboard, MainLayout } from './screens';
import { applyMiddleware, createStore } from 'redux'
import ThemeReducer from './Store/ThemeReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


const App = () => {
  const store = createStore(
    ThemeReducer,
    applyMiddleware(thunk)
  )

  const Stack = createSharedElementStackNavigator();
  const options = {
    gestureEnabled: false,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: { duration: 400, easing: Easing.inOut(Easing.ease) }
      },
      close: {
        animation: 'timing',
        config: { duration: 400, easing: Easing.inOut(Easing.ease) }
      }
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress
        }
      }
    }
  }

  return (
    <Provider store={store} >
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName='Dashboard'
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          detachInactiveScreens={false}
        >
          <Stack.Screen name='Dashboard' component={MainLayout} />

          <Stack.Screen name='CourseListing'
            options={() => options}
            component={CourseListing} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  );
};

export default App;
