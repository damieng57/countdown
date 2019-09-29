import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied'
    })
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Low
  })
  return location
}
