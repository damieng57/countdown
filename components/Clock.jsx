import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'

export class Clock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showAbout: false
    }

    this.additionnalStyleYears = { color: '#fff' }
    this.additionnalStyleDays = { color: '#fff' }
    this.additionnalStyleHours = { color: '#fff' }
    this.additionnalStyleMinutes = { color: '#fff' }
    this.additionnalStyleSeconds = { color: '#fff' }
  }

  render() {
    if (this.state.showAbout)
      return (
        <View>
          <Text>About this app...</Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                showAbout: false
              })
            }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )

    this.additionnalStyleYears =
      this.props.years === '00' ? { color: 'red' } : { color: '#fff' }
    this.additionnalStyleDays =
      this.props.years === '00' &&
      this.props.days === '00' &&
      this.additionnalStyleYears.color === 'red'
        ? { color: 'red' }
        : { color: '#fff' }
    this.additionnalStyleHours =
      this.props.years === '00' &&
      this.props.days === '00' &&
      this.props.hours === '00' &&
      this.additionnalStyleDays.color === 'red'
        ? { color: 'red' }
        : { color: '#fff' }
    this.additionnalStyleMinutes =
      this.props.years === '00' &&
      this.props.days === '00' &&
      this.props.hours === '00' &&
      this.props.minutes === '00' &&
      this.additionnalStyleHours.color === 'red'
        ? { color: 'red' }
        : { color: '#fff' }
    this.additionnalStyleSeconds =
      this.props.years === '00' &&
      this.props.days === '00' &&
      this.props.hours === '00' &&
      this.props.days === '00' &&
      this.props.seconds === '00' &&
      this.additionnalStyleMinutes.color === 'red'
        ? { color: 'red' }
        : { color: '#fff' }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={[style.row, { marginTop: -20 }]}>
          <View style={style.emptyZone}></View>
          <Text style={[style.number, this.additionnalStyleYears]}>
            {this.props.years}
          </Text>
          <Text style={[style.text, this.additionnalStyleYears]}>YRS</Text>
        </View>
        <View style={style.row}>
          <View style={style.emptyZone}></View>
          <Text style={[style.number, this.additionnalStyleDays]}>
            {this.props.days}
          </Text>
          <Text style={[style.text, this.additionnalStyleDays]}>DAY</Text>
        </View>
        <View style={style.row}>
          <View style={style.emptyZone}></View>
          <Text style={[style.number, this.additionnalStyleHours]}>
            {this.props.hours}
          </Text>
          <Text style={[style.text, this.additionnalStyleHours]}>HRS</Text>
        </View>
        <View style={style.row}>
          <View style={style.emptyZone}></View>
          <Text style={[style.number, this.additionnalStyleMinutes]}>
            {this.props.minutes}
          </Text>
          <Text style={[style.text, this.additionnalStyleMinutes]}>MIN</Text>
        </View>
        <View style={[style.row, { marginBottom: 0 }]}>
          <View style={[style.emptyZone, { justifyContent: 'flex-start' }]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showAbout: true })
              }}>
              <Text>About</Text>
            </TouchableOpacity>
          </View>
          <Text style={[style.number, this.additionnalStyleSeconds]}>
            {this.props.seconds}
          </Text>
          <Text style={[style.text, this.additionnalStyleSeconds]}>SEC</Text>
        </View>
      </ScrollView>
    )
  }
}

export default Clock

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  emptyZone: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: -20,
    justifyContent: 'center'
  },
  number: {
    fontFamily: 'oswald-regular',
    fontSize: 100,
    color: '#fff',
    height: 135,
    width: 128,
    opacity: 0.8
  },
  text: {
    flex: 1,
    textAlignVertical: 'bottom',
    fontFamily: 'oswald-regular',
    fontSize: 30,
    color: '#fff',
    opacity: 0.8,
    marginLeft: -17
  }
})
