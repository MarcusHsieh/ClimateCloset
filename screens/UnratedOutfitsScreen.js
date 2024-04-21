// from "Rate Your Outfits"
// navigate to rating screen when outfit is clicked

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
  const unratedOutfits = outfits.filter((outfit) => !outfit.rated);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unrated Outfits</Text>
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
    width: 50,
    height: 50,
    marginRight: 20,
  },
});

export default UnratedOutfitsScreen;
