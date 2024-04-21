import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing screens
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import UnratedOutfitsScreen from './screens/UnratedOutfitsScreen';
import ClosetScreen from './screens/MyClosetScreen';
import FilteredOutfitsScreen from './screens/FilteredOutfitsScreen';
import RatingScreen from './screens/RatingScreen';
import ShowRatingScreen from './screens/ShowRatingScreen';

const Stack = createStackNavigator();

function App() {
  const [outfits, setOutfits] = useState([]);

  // Load outfits from AsyncStorage
  useEffect(() => {
    const loadOutfits = async () => {
      try {
        const storedOutfits = await AsyncStorage.getItem('outfits');
        if (storedOutfits) {
          setOutfits(JSON.parse(storedOutfits));
        }
      } catch (error) {
        console.error('Error loading outfits from AsyncStorage:', error);
      }
    };

    loadOutfits();
  }, []);

  // Update outfits in both state and AsyncStorage
  const updateOutfits = async (newOutfits) => {
    try {
      setOutfits(newOutfits);
      await AsyncStorage.setItem('outfits', JSON.stringify(newOutfits));
    } catch (error) {
      console.error('Error saving outfits to AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              outfits={outfits}
              setOutfits={updateOutfits}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Camera" options={{ title: 'Take Picture' }}>
          {(props) => (
            <CameraScreen
              {...props}
              addOutfit={(outfit) => updateOutfits([...outfits, outfit])}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="UnratedOutfits">
          {(props) => (
            <UnratedOutfitsScreen
              {...props}
              outfits={outfits}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Closet">
          {(props) => (
            <ClosetScreen
              {...props}
              outfits={outfits}
              navigation={props.navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="FilteredOutfits"
          options={{ title: 'Filtered Outfits' }}
        >
          {(props) => (
            <FilteredOutfitsScreen
              {...props}
              outfits={outfits}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RatingScreen" options={{ title: 'Rate Outfit' }}>
          {(props) => (
            <RatingScreen
              {...props}
              outfits={outfits}
              updateOutfits={updateOutfits}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ShowRatingScreen" options={{ title: 'Show Outfit Rating' }}>
          {(props) => (
            <ShowRatingScreen
              {...props}
              outfits={outfits}
              updateOutfits={updateOutfits}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
