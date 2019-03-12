import React, { Component } from 'react';
import {
    View, Image, Dimensions,Keyboard
} from 'react-native';
export default class SplashScreen extends Component {

    render() {

        let screenWidth = Dimensions.get('window').width;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => Keyboard.dismiss()}
            >
                <Image
                    style={{
                        height: screenWidth * 505 / 369,
                        width: screenWidth,
                    }}
                    source={require('../images/Chef.png')}
                />
            </View>
        )
    }
}