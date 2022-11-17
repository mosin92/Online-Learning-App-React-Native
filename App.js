import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dashboard, MainLayout } from './screens';
import { applyMiddleware, createStore } from 'redux'
import ThemeReducer from './Store/ThemeReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {
  const store = createStore(
    ThemeReducer,
    applyMiddleware(thunk)
  )

  const Stack = createStackNavigator()
  return (
    <Provider store={store} >
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName='Dashboard'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Dashboard' component={MainLayout} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  );
};

export default App;
