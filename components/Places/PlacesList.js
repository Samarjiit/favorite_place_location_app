import { FlatList, View, Text, StyleSheet } from "react-native"
import PlaceItem from "./PlaceItem"
import { Colors } from "../../constants/colors"

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={StyleSheet.fallbackContainer}>
        <Text style={StyleSheet.fallbackText}>
          No places added yet -start adding some !!
        </Text>
      </View>
    )
  }
  return (
    <FlatList
      style={StyleSheet.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  )
}
export default PlacesList
const style = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: { margin: 30 },
  fallbackText: { fontSize: 16, color: Colors.primary200 },
})
