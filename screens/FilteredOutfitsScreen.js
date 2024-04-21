import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

function FilteredOutfitsScreen({ route }) {
  const { lowTemp, highTemp, outfits } = route.params;

  // Calculate the filtered outfits based on the average temperature of each outfit
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
            <View style={styles.outfitItem}>
              <Image source={{ uri: item.image }} style={styles.outfitImage} />
              <Text>{item.name}</Text>
            </View>
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
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  outfitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  outfitImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  noOutfitsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FilteredOutfitsScreen;
