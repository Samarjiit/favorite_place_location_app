export class Place {
  constructor(title, imageUri, location) {
    this.title = title
    this.imageUri = imageUri
    this.location = { lat: location.lat, lng: location.lng }
    this.id = new Date().toString() + Math.random().toString()
  }
}
