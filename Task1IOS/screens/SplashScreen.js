import React, { Component } from 'react';
import { ImageBackground, Dimensions, View } from 'react-native';
import SplashIcon from './SplashIcon'
export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('auth')
    }, 3000)
  }

  render() {
    let screenWidth = Dimensions.get('window').width;
    return (

      <ImageBackground
        source={require('../images/Makhbouz.jpg')}
        style={{
          width: screenWidth,
          height: '100%', marginTop: 22
        }}
      ><View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <SplashIcon />
        </View>
      </ImageBackground>
    )
  }
}