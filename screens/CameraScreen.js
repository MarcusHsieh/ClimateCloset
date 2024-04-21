import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Text,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

function CameraScreen({ navigation, addOutfit }) {
  const [photoUri, setPhotoUri] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [tempRange, setTempRange] = useState('');

  const openPhotoLibrary = () => {
    launchImageLibrary({}, (response) => {
      if (response.errorCode) {
        Alert.alert('Error', `An error occurred: ${response.errorMessage}`);
        return;
      }

      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  const submitOutfit = () => {
    if (!outfitName || !tempRange) {
      Alert.alert("Please enter an outfit name and today's weather range.");
      return;
    }

    if (!photoUri) {
      Alert.alert("Please select a photo before submitting.");
      return;
    }

    const newOutfit = {
      id: Date.now(),
      name: outfitName,
      tempRange,
      image: photoUri,
    };

    addOutfit(newOutfit);

    // Clear the form and navigate back
    setOutfitName('');
    setTempRange('');
    setPhotoUri('');

    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1 }}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Outfit Name"
              value={outfitName}
              onChangeText={setOutfitName}
            />
            <TextInput
              style={styles.input}
              placeholder="Today's Weather Range"
              value={tempRange}
              onChangeText={setTempRange}
            />
            <Button title="Submit" onPress={submitOutfit} />
          </View>
        </View>
      ) : (
        <View style={styles.captureButtonContainer}>
          <Button title="Choose from Library" onPress={openPhotoLibrary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreview: {
    width: '100%',
    height: '50%',
  },
  form: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen;
