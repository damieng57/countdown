import React from 'react'
import { AsyncStorage } from 'react-native'
import {
  LsCountDown,
  LsCountdownOptions,
  LsCountdownSufixes
} from 'ls-countdown'
import Dead from '../components/Dead'
import Clock from '../components/Clock'
import Indicator from '../components/Indicator'
import { getLocationAsync } from '../functions/location'
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
      city: ''
    }
  }

  getRandomInt(max = 25150) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  _removeData = async key => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    // Create a new options class with the parameters
    let targetDate
    try {
      targetDate = await AsyncStorage.getItem('date')
      // targetDate = new Date('September 30, 2019 15:24:00') // used for test
      if (!targetDate) {
        targetDate = new Date(
          new Date().getTime() + this.getRandomInt() * 24 * 60 * 60 * 1000
        )
        this._storeData('date', targetDate.toISOString())
      } else {
        targetDate = new Date(Date.parse(targetDate))
      }
    } catch (error) {
      console.log(error)
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
        if (location) {
          return setTimeout(() => {
            this.setState({
              showDeath: true,
              location: location,
              city: 'CITY'
            })
          }, 2000)
        }
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        this.setState({
          showDeath: true
        })
      }, 2000)
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

    if (this.state.showDeath) return <Dead></Dead>

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
