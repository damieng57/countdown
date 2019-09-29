import React from 'react'
import { View, Animated } from 'react-native'

export class Dead extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  _onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 3000
    }).start()
  }

  componentDidMount() {
    this._onLoad()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          AlignItems: 'center',
          backgroundColor: 'black'
        }}>
        <Animated.Image
          source={require('../assets/icon.png')}
          style={{
            alignSelf: 'center',
            opacity: this.state.opacity,
            width: 80,
            height: 80
          }}></Animated.Image>
      </View>
    )
  }
}

export default Dead
