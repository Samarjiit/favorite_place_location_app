import { Alert, View, StyleSheet, Text, Image } from "react-native"
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location"

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native" //useroute -data pass from 2 diff screen

import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"
import { useEffect, useState } from "react"
import { getMapPreview } from "../../Util/location"

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState()
  const isFocused = useIsFocused() //false when we enter the map and true when we come back from map
  const navigation = useNavigation()
  const route = useRoute()
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    onPickLocation(pickedLocation)
  }, [pickedLocation, onPickLocation])
  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      )
      return false
    }

    return true
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermission()
    if (!hasPermission) return
    const location = await getCurrentPositionAsync()
    console.log(location)
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {
    navigation.navigate("Map")
  }
  let locationPreview = <Text>no location picked yet</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    )
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}
export default LocationPicker

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4
  },
})
