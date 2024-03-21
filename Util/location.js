const GOOGLE_API_KEY = "AIzaSyAnnlpWQIi3z5lm4HoOP96Xkccv2j9H7pQ"

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewUrl
}

export async function getAddress(lat, lng) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GOOGLE_API_KEY}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch address!")
  }
  const data = await response.json()
  const address = data.features[0].properties.formatted
  return address
}
