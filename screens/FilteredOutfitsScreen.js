import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

function FilteredOutfitsScreen({ route, navigation }) { // Added navigation
  const { lowTemp, highTemp, outfits } = route.params;

  const filteredOutfits = outfits.filter((outfit) => {
    const avgTemp = (outfit.lowTemp + outfit.highTemp) / 2;
    return avgTemp >= lowTemp && avgTemp <= highTemp;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outfits for Today</Text>
      {filteredOutfits.length > 0 ? (
        <FlatList
          data={filteredOutfits}
          renderItem={({ item }) => (
            <TouchableOpacity // Add TouchableOpacity to handle taps
              style={styles.outfitItem}
              onPress={() => navigation.navigate('ShowRatingScreen', { outfit: item })} // Navigate to ShowRatingScreen with outfit details
            >
              <Image source={{ uri: item.image }} style={styles.outfitImage} />
              <Text style={styles.outfitName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noOutfitsText}>No outfits match the given temperature range.</Text>
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
    marginVertical: 10,
  },
  outfitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  outfitImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  outfitName: {
    fontSize: 18, // Increased font size for outfit name
  },
  noOutfitsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FilteredOutfitsScreen;
