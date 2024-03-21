import { ScrollView, Image, View, Text } from "react-native"

import OutlinedButton from "../components/UI/OutlinedButton"
function PlaceDetails() {
  function showOnMapHandler() {}
  return (
    <ScrollView>
      <Image />
      <View>
        <View>
          <Text>Address</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails
