import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import config from '../config'
import axios from 'axios'

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') return null

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Low
  })
  return location
}

export const getTown = async location => {
  const url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${config.app_id}&app_code=${config.app_code}&mode=retrieveAddresses&prox=${location.coords.latitude},${location.coords.longitude}`
  console.log(url)
  // Axios GET
  return axios
    .get(url)
    .then(response => response)
    .catch(error => console.log(error))
}
