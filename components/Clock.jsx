import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class Clock extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.display}>
          <Text style={style.number}> {this.props.years} </Text>
          <Text style={style.text}> years </Text>
        </View>
        <View style={style.display}>
          <Text style={style.number}> {this.props.days} </Text>
          <Text style={style.text}> days </Text>
        </View>
        <View style={style.display}>
          <Text style={style.number}> {this.props.hours} </Text>
          <Text style={style.text}> hours </Text>
        </View>
        <View style={style.display}>
          <Text style={style.number}> {this.props.minutes} </Text>
          <Text style={style.text}> minutes </Text>
        </View>
        <View style={style.display}>
          <Text style={style.number}> {this.props.seconds} </Text>
          <Text style={style.text}> seconds </Text>
        </View>
      </View>
    )
  }
}

export default Clock

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-around',
    paddingVertical: 30
  },
  display: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 70,
    color: '#fff',
    fontWeight: 'bold',
    height: 76
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    height: 38
  }
})
