import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native"
import { useCallback, useState } from "react"
import { Colors } from "../../constants/colors"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import Button from "../UI/Button"
import { Place } from "../../models/place"
function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("")
  const [selectedImage, setSelectedImage] = useState()
  const [pickedLocation, setPickedLocation] = useState()

  function changeTitleHandler(enteredText) {
    //enteredtext is a default get from react-native
    setEnteredTitle(enteredText)
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location) //now it has both lat nd long as well as human address
  }, [])
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri)
  }
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
    onCreatePlace(placeData)
    console.log(enteredTitle)
    console.log(selectedImage)
    console.log(pickedLocation)
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place </Button>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
})
