import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

function HomeScreen({ navigation, outfits }) {
  const [lowTemp, setLowTemp] = useState('');
  const [highTemp, setHighTemp] = useState('');

  const handleTempSubmit = () => {
    const low = parseFloat(lowTemp);
    const high = parseFloat(highTemp);

    if (isNaN(low) || isNaN(high)) {
      alert('Please enter valid numbers for temperature.');
      return;
    }

    navigation.navigate('FilteredOutfits', { lowTemp: low, highTemp: high, outfits });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClimateCloset</Text>
      <Text style={styles.subheading}>
        an app designed to journal your outfits based on the weather
      </Text>

      <Text style={styles.greeting}>Hello! Let's figure out what to wear today...</Text>

      <View style={styles.tempInputContainer}>
        <TextInput
          style={styles.tempInput}
          placeholder="Low (°F)"
          value={lowTemp}
          onChangeText={setLowTemp}
          keyboardType="numeric"
        />
        <Text style={styles.dash}>-</Text>
        <TextInput
          style={styles.tempInput}
          placeholder="High (°F)"
          value={highTemp}
          onChangeText={setHighTemp}
          keyboardType="numeric"
        />
      </View>

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
    marginTop: 0,
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10, 
    textAlign: 'center',
    width: 200,
  },
  greeting: {
    marginTop: 60,
    fontSize: 18,
    color: 'gray',
  },
  tempInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 200,
  },
  tempInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
  },
  dash: {
    fontSize: 20,
    paddingHorizontal: 10,
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
  },
  menuButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default HomeScreen;
