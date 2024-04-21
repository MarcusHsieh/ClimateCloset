import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function ShowRatingScreen({ route }) {
  const { outfit } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outfit Details</Text>
      <Image source={{ uri: outfit.image }} style={styles.outfitImage} />
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.text}>{outfit.name}</Text>
      <Text style={styles.label}>Personal Thoughts:</Text>
      <Text style={styles.text}>{outfit.colorScheme}</Text>
      <Text style={styles.label}>Temperature Range:</Text>
      <Text style={styles.text}>
        {outfit.lowTemp} - {outfit.highTemp} °F
      </Text>
      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.text}>{outfit.rating}/5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28, // Increased title size
    fontWeight: 'bold',
    marginBottom: 20,
  },
  outfitImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 20, // Larger font for labels
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18, // Increased font size for text
  },
});

export default ShowRatingScreen;
