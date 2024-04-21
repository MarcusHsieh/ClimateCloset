import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Text,
  Platform,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';

async function requestCameraPermission() {
  
  const result = await request(PERMISSIONS.IOS.CAMERA);
  return result === RESULTS.GRANTED;

}

function CameraScreen({ navigation, addOutfit }) {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [tempRange, setTempRange] = useState('');

  useEffect(() => {
    (async () => {
      const hasPermission = await requestCameraPermission();
      setCameraPermission(hasPermission);
    })();
  }, []);

  const openNativeCamera = async () => {
    if (!cameraPermission) {
      Alert.alert('Camera permission required', 'Please allow camera access to use this feature.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };

  const takePicture = async (camera) => {
    if (!cameraPermission) {
      Alert.alert('Camera permission is required to use this feature.');
      return;
    }

    try {
      const photo = await camera.takePhoto({ quality: 0.5, enableAutoStabilization: true });
      setPhotoUri(photo.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const submitOutfit = () => {
    if (!outfitName || !tempRange) {
      Alert.alert("Please enter an outfit name and today's weather range.");
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

  if (!cameraPermission) {
    return (
      <View style={styles.permissionWarning}>
        <Text>Camera permission is required to use this feature.</Text>
      </View>
    );
  }

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
        <Camera
          style={{ flex: 1 }}
          ref={(ref) => {
            this.camera = ref;
          }}
          captureAudio={false}
        >
          <View style={styles.captureButtonContainer}>
            <Button 
              title="Take Picture" 
              onPress={() => takePicture(this.camera)} 
            />
          </View>
        </Camera>
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
  permissionWarning: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default CameraScreen;
