import { Alert, Image, StyleSheet, Text, View } from "react-native"
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker"
import { useState } from "react"

import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"

function ImagePicker({ onTakeImage }) {
  //ImagePicker function is a React functional component responsible for capturing images using the device's camera
  const [pickedImage, setPickedImage] = useState("") //is instead of logging that image that was taken, we have to store this image object that describes the image in some state that belongs to this image picker component.used to store the URI of the captured image

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions()
  /*Camera Permissions: The useCameraPermissions hook provides information about camera permissions status and a function to request camera permissions.
verifyPermissions Function: This asynchronous function checks whether the app has camera permissions. If permissions are undetermined, it requests permission from the user. If permissions are denied, it displays an alert.*/
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      )
      return false
    }

    return true
  }
  //it verifies permissions, then uses launchCameraAsync to launch the device's camera and capture an image
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    console.log("image", image)
    //URI is stored in the pickedImage state.
    setPickedImage(image.assets[0].uri)
    onTakeImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
})
