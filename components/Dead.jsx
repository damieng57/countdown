import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

export class Dead extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageOpacity: new Animated.Value(0),
      textOpacity: new Animated.Value(0)
    }
  }

  _onLoad() {
    Animated.sequence([
      Animated.timing(this.state.textOpacity, {
        toValue: 1,
        duration: 3000
      }),
      Animated.timing(this.state.imageOpacity, {
        toValue: 1,
        duration: 3000
      })
    ]).start()
  }

  async componentDidMount() {
    this._onLoad()
    const soundObject = new Audio.Sound()
    try {
      await soundObject.loadAsync(require('../assets/sounds/scream.mp3'))
      await soundObject.playAsync()
    } catch (error) {
      // An error occurred!
    }
  }

  render() {
    let message
    if (this.props.onError !== '') {
      message = this.props.onError
    } else {
      message =
        this.props.city === ''
          ? 'Death will find you'
          : `Death is in ${this.props.city}...behind you`
    }

    return (
      <View style={style.container}>
        <Animated.Text
          style={[style.text, { opacity: this.state.textOpacity }]}>
          {message}
        </Animated.Text>
        <Animated.Image
          source={require('../assets/icon.png')}
          style={[
            style.image,
            { opacity: this.state.imageOpacity }
          ]}></Animated.Image>
      </View>
    )
  }
}

export default Dead

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: '#fff',
    width: '100%',
    fontSize: 20,
    fontFamily: 'oswald-regular',
    textAlign: 'center',
    marginBottom: 16
  },
  image: {
    alignSelf: 'center',
    width: 80,
    height: 80
  }
})
