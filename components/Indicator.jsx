import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export class Indicator extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black'
        }}>
        <ActivityIndicator color="white" size="large"></ActivityIndicator>
      </View>
    )
  }
}

export default Indicator
