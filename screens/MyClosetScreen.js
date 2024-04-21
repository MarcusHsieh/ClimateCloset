import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

function ClosetScreen({ navigation, outfits }) {
  if (!outfits || outfits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No outfits found in your closet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Closet</Text>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ShowRatingScreen', { outfit: item })}
          >
            <Image source={{ uri: item.image }} style={styles.outfitImage} />
            <View style={styles.textContainer}>
              <Text style={styles.outfitName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.ratingText}>
                {item.rating ? `Rating: ${item.rating}/5` : 'Not Rated'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  outfitImage: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  textContainer: {
    flex: 1, 
  },
  outfitName: {
    fontSize: 25,
    flexShrink: 1,
    paddingRight: 10,
  },
  ratingText: {
    color: 'gray',
    fontSize: 14,
    paddingLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClosetScreen;
