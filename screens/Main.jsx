import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Font from 'expo-font'
import {
  LsCountDown,
  LsCountdownOptions,
  LsCountdownSufixes
} from 'ls-countdown'
import Dead from '../components/Dead'
import Clock from '../components/Clock'
import Indicator from '../components/Indicator'
import { getLocationAsync, getTown, getRandomInt } from '../functions'

// TODO: Display when Days with 3 digits
export class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      years: '00',
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isReady: false,
      isOver: false,
      showDeath: false,
      location: '',
      city: '',
      onError: ''
    }
  }

  _townNotFound = () => {
    return setTimeout(() => {
      this.setState({
        showDeath: true
      })
    }, 2000)
  }

  async componentDidMount() {
    let targetDate
    try {
      // First loading Fonts
      await Font.loadAsync({
        'oswald-regular': require('../assets/fonts/Oswald-Regular.ttf')
      })

      targetDate = await AsyncStorage.getItem('date')
      // targetDate = false // used for reinit during dev
      // targetDate = 'October 13, 2019 22:37:00' // used for test
      if (!targetDate) {
        console.log('**')
        targetDate = new Date(
          new Date().getTime() + getRandomInt() * 24 * 60 * 60 * 1000
        )
        await AsyncStorage.setItem('date', targetDate.toISOString())
      } else if (
        new Date(Date.parse(targetDate)).getTime() < new Date().getTime()
      ) {
        return this.setState({
          isReady: true,
          isOver: true,
          showDeath: true
        })
      } else {
        targetDate = new Date(Date.parse(targetDate))
      }
    } catch (error) {
      // console.log(error)
      return this.setState({
        isReady: true,
        isOver: true,
        showDeath: true,
        onError: 'Oups, an error has preceded death!'
      })
    }

    const onStart = async () => {}
    const onTick = ({ years, days, hours, minutes, seconds }) => {
      let current = {
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        isReady: true
      }
      if (
        years === '00' &&
        days === '00' &&
        hours === '00' &&
        minutes === '00' &&
        seconds === '00' &&
        !this.state.isOver
      ) {
        this.setState({ ...current, isOver: true })
        return countdown.stop()
      }
      this.setState(current)
    }
    const onStop = async () => {
      try {
        let location = await getLocationAsync()
        let result = await getTown(location)
        let city = result.data.Response.View[0].Result[0].Location.Address.City
        if (location) {
          return setTimeout(() => {
            this.setState({
              showDeath: true,
              location: location,
              city: city
            })
          }, 2000)
        }
        return this._townNotFound()
      } catch (error) {
        this._townNotFound()
      }
    }
    const sufixes = new LsCountdownSufixes({
      years: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    })
    const options = new LsCountdownOptions({
      targetDate,
      onStart,
      onTick,
      onStop,
      sufixes
    })
    const countdown = new LsCountdown(options)
    // starts to countdown
    countdown.start(options)
  }

  render() {
    if (!this.state.isReady) return <Indicator></Indicator>

    if (this.state.showDeath)
      return <Dead city={this.state.city} onError={this.state.onError}></Dead>

    return (
      <Clock
        years={this.state.years}
        days={this.state.days}
        hours={this.state.hours}
        minutes={this.state.minutes}
        seconds={this.state.seconds}></Clock>
    )
  }
}

export default Main
