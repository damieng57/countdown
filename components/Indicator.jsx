import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export class Indicator extends Component {
  render() {
    return (
      <View style={style.container}>
        <ActivityIndicator color="white" size="large"></ActivityIndicator>
      </View>
    )
  }
}

export default Indicator

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})
