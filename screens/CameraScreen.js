import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

// image selection
function CameraScreen({ navigation, addOutfit }) {
  const [photoUri, setPhotoUri] = useState('');
  const [outfitName, setOutfitName] = useState('');

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

  // name outfit and submit
  const submitOutfit = () => {
    if (!outfitName) {
      Alert.alert("Please enter an outfit name.");
      return;
    }

    if (!photoUri) {
      Alert.alert("Please select a photo before submitting.");
      return;
    }

    const newOutfit = {
      id: Date.now(),
      name: outfitName,
      image: photoUri,
    };

    addOutfit(newOutfit);

    // clear form and navigate back
    setOutfitName('');
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
    height: 45, 
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%', 
    paddingHorizontal: 10,
    marginVertical: 10, 
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen;
