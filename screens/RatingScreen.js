import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';

function RatingScreen({ route, navigation, updateOutfits, outfits }) {
  const { outfit } = route.params;

  const [colorScheme, setColorScheme] = useState(outfit?.colorScheme || '');
  const [lowTemp, setLowTemp] = useState(outfit?.lowTemp || '');
  const [highTemp, setHighTemp] = useState(outfit?.highTemp || '');
  const [rating, setRating] = useState(outfit?.rating || 0);

  const handleSubmit = () => {
    // Validate input fields
    if (!colorScheme || !lowTemp || !highTemp || rating === 0) {
      Alert.alert('Incomplete Information', 'Please fill out all fields and provide a rating.');
      return;
    }

    const updatedOutfit = {
      ...outfit,
      colorScheme,
      lowTemp,
      highTemp,
      rating,
      rated: true, 
    };

    const updatedOutfits = outfits.map((o) =>
      o.id === outfit.id ? updatedOutfit : o
    );

    updateOutfits(updatedOutfits); // Update the state and potentially persist
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Your Outfit</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe the color scheme"
        value={colorScheme}
        onChangeText={setColorScheme}
      />

      <TextInput
        style={styles.input}
        placeholder="Low Temperature (°F)"
        keyboardType="numeric"
        value={lowTemp}
        onChangeText={(text) => setLowTemp(parseFloat(text))}
      />

      <TextInput
        style={styles.input}
        placeholder="High Temperature (°F)"
        keyboardType="numeric"
        value={highTemp}
        onChangeText={(text) => setHighTemp(parseFloat(text))}
      />

      <Text>Rate this Outfit:</Text>
      <Rating
        showRating
        onFinishRating={setRating}
        style={styles.rating}
        defaultRating={rating}
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
