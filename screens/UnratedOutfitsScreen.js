import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

function UnratedOutfitsScreen({ navigation, outfits }) {
  // check if outfits data is valid and is an array
  if (!Array.isArray(outfits)) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Outfits data is not available.</Text>
      </View>
    );
  }

  // filter to get only unrated outfits (where rated is undefined or false)
  const unratedOutfits = outfits.filter((outfit) => !outfit.rated);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Outfits</Text>
      {unratedOutfits.length === 0 ? (
        <Text>No outfits to rate</Text>
      ) : (
        <FlatList
          data={unratedOutfits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('RatingScreen', { outfit: item })}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.outfitImage}
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  title: {
    fontSize: 24,
    color: 'blue',
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  outfitImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default UnratedOutfitsScreen;
