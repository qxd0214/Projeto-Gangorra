import { TouchableOpacity, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/MaterialIcons';
import { Home } from '../screens/Home';
import { ControlPanel } from '../screens/ControlPanel';
import { HeaderBackground } from '../styles/global';

import logo from '../assets/images/logo-small.png';
import { useBLE } from '../hooks/useBLE';

const App = createNativeStackNavigator();

export function Routes(){

  const { disconnectDevice } = useBLE()

  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      /> 
      <App.Screen
        name="control-panel"
        component={ControlPanel}
        options={{
          headerTitle: () => <Image source={logo} />,
          headerTitleAlign: 'center',
          headerBackground: () => <HeaderBackground />,
          headerRight: () => (
          <TouchableOpacity onPress={disconnectDevice}>
            <Text>Desconectar</Text>
          </TouchableOpacity>
          ),
          headerBackVisible: false,
         /*  headerLeft: () => (
            <TouchableOpacity onPress={() => console.log('daasdasd')}>
              <Feather name="dehaze" size={32} color="#000000" />
            </TouchableOpacity>
          ) */
        }}
      />
    </App.Navigator>
  );
};