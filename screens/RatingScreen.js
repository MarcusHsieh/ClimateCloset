// from unratedOutfitsScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RatingScreen({ route, navigation, updateOutfits, outfits }) {
  const { outfitId } = route.params; // Passed from UnratedOutfitsScreen or wherever you navigate from
  
  // Find the outfit to be rated
  const outfitToRate = outfits.find(outfit => outfit.id === outfitId);

  const [colorScheme, setColorScheme] = useState(outfitToRate?.colorScheme || '');
  const [temperature, setTemperature] = useState(outfitToRate?.temperature || { hot: false, cold: false, good: false });
  const [rating, setRating] = useState(outfitToRate?.rating || 0);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleTemperature = (type) => {
    setTemperature({ hot: false, cold: false, good: false, [type]: true });
  };

  const handleSubmit = () => {
    if (!colorScheme || !(temperature.hot || temperature.cold || temperature.good) || rating === 0) {
      alert('Please fill out all fields');
      return;
    }

    // Update the outfit with the new data
    const updatedOutfit = {
      ...outfitToRate,
      colorScheme,
      temperature,
      rating,
    };

    // Update the outfits state
    const newOutfits = outfits.map(outfit => outfit.id === outfitId ? updatedOutfit : outfit);

    // Persist the updated outfits in AsyncStorage
    updateOutfits(newOutfits);

    // Navigate back or to a different screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Your Outfit</Text>
      <TextInput
        style={styles.input}
        placeholder="How was the color scheme?"
        value={colorScheme}
        onChangeText={setColorScheme}
      />
      <CheckBox title="Hot" checked={temperature.hot} onPress={() => handleTemperature('hot')} />
      <CheckBox title="Cold" checked={temperature.cold} onPress={() => handleTemperature('cold')} />
      <CheckBox title="Good" checked={temperature.good} onPress={() => handleTemperature('good')} />
      <Rating
        showRating
        onFinishRating={handleRating}
        style={{ paddingVertical: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RatingScreen;
