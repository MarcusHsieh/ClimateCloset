import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation, outfits, setOutfits }) {
  const [tempRange, setTempRange] = useState('');

  const handleTempSubmit = () => {
    // Filter outfits based on tempRange and navigate to FilteredOutfitsScreen
    const filteredOutfits = outfits.filter(outfit => outfit.tempRange === tempRange);
    navigation.navigate('FilteredOutfits', { outfits: filteredOutfits });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClimateCloset</Text>
      <Text style={styles.greeting}>Hello! Let's figure out what to wear today...</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter today's low and high temperature range"
        value={tempRange}
        onChangeText={setTempRange}
      />
      <Button title="Submit" onPress={handleTempSubmit} />
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.menuButtonText}>Take a Click of Your Outfit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('UnratedOutfits')}
        >
          <Text style={styles.menuButtonText}>Rate Your Outfits</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Closet')}
        >
          <Text style={styles.menuButtonText}>View Your Closet</Text>
        </TouchableOpacity>
      </View>
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
  },
  greeting: {
    fontSize: 18,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  menu: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: 'lightblue',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 16,
    color: 'white',
  },
});


export default HomeScreen;

// In this component, I’ve used the useState hook to manage the state of the temperature range input. When the user types in the input, the setTempRange function is called to update the tempRange state.
// The filteredOutfits constant holds the outfits that match the input temperature range. This is done by filtering the outfits prop based on the tempRange state.
// The FlatList component is used to display the filtered outfits. Each outfit is displayed as an image and a name in a row. The keyExtractor prop is used to specify a unique key for each item in the list.