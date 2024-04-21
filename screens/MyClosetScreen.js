import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

function ClosetScreen({ outfits }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Closet</Text>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.outfitImage} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
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

export default ClosetScreen;
