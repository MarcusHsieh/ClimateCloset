import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';

function ShowRatingScreen({ route, navigation, updateOutfits, outfits }) {
  const { outfit } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Delete Outfit',
      'Are you sure you want to delete this outfit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // filter outfit to be deleted
            const updatedOutfits = outfits.filter((o) => o.id !== outfit.id);
            // update the outfits list
            updateOutfits(updatedOutfits);
            // navigate back to previous screen
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('RatingScreen', { outfit });
  };

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

      {/* Buttons for editing and deleting */}
      <View style={styles.buttonContainer}>
        <Button title="Edit Outfit" onPress={handleEdit} color="blue" />
        <Button title="Delete Outfit" onPress={handleDelete} color="red" />
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  outfitImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default ShowRatingScreen;
