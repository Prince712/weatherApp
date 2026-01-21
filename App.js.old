import React from 'react';
import {Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {extendTheme, NativeBaseProvider} from 'native-base';

// import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
// import {View, ActivityIndicator} from 'react-native';
// import {TabBar} from './src/navigations/tabNavigator';
// import ChatDemo from './src/demos';
 import RouteComponent from './src/navigations';
 const colorTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },

    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider theme={colorTheme}>
          <RouteComponent /> 
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
   
  );
};

export default App;
