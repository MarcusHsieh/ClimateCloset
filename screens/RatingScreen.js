import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

function RatingScreen({ route, navigation, updateOutfits, outfits }) {
  const { outfit } = route.params; // Passed from UnratedOutfitsScreen or wherever you navigate from

  const [colorScheme, setColorScheme] = useState(outfit?.colorScheme || '');
  const [lowTemp, setLowTemp] = useState(outfit?.lowTemp || '');
  const [highTemp, setHighTemp] = useState(outfit?.highTemp || '');
  const [rating, setRating] = useState(outfit?.rating || 0);

  const handleSubmit = () => {
    if (!colorScheme || !lowTemp || !highTemp || rating === 0) {
      alert('Please fill out all fields');
      return;
    }

    const updatedOutfit = {
      ...outfit,
      colorScheme,
      lowTemp,
      highTemp,
      rating,
    };

    const updatedOutfits = outfits.map((o) => (o.id === outfit.id ? updatedOutfit : o));

    updateOutfits(updatedOutfits);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Your Outfit</Text>

      <TextInput
        style={styles.input}
        placeholder="Personal Thoughts"
        value={colorScheme}
        onChangeText={setColorScheme}
      />

      <TextInput
        style={styles.input}
        placeholder="Low Temperature (°F)"
        keyboardType="numeric"
        value={lowTemp}
        onChangeText={setLowTemp}
      />

      <TextInput
        style={styles.input}
        placeholder="High Temperature (°F)"
        keyboardType="numeric"
        value={highTemp}
        onChangeText={setHighTemp}
      />

      <Rating
        showRating
        onFinishRating={setRating}
        style={styles.rating}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45, 
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%', 
    paddingHorizontal: 10,
    marginVertical: 10, 
  },
  rating: {
    paddingVertical: 10,
  },
});

export default RatingScreen;
