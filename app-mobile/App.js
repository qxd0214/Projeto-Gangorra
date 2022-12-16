import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, Text } from 'react-native'
import { Routes } from './src/routes/app.routes'
import FlashMessage from "react-native-flash-message";
import { BLEProvider } from './src/Context/BLEContext';

export function App() {
  return (
    <>
      <NavigationContainer>
        <BLEProvider>
          <StatusBar backgroundColor="#4361EE" >
            <View style={{ flex: 1, backgroundColor: '#4361EE' }}>
              <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginTop: 20 }}>React Native</Text>
            </View>
          </StatusBar>
          <Routes />
        </BLEProvider>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  )
}