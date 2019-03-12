import React, { Component } from 'react';
import {
    TouchableOpacity, ImageBackground,
    Text, View, Dimensions,Keyboard
} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends Component {
    render() {
        let screenWidth = Dimensions.get('window').width;
        return (
            <ImageBackground
                source={require('../images/Makhbouz.jpg')}
                style={{
                    width: screenWidth,
                    height: '100%', marginTop: 22
                }}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={() => Keyboard.dismiss()}>

                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 30, color: 'white'
                    }}>
                        Welcome Makhbouz !</Text>

                    <TouchableOpacity
                        style={{
                            height: '10%', width: '50%', marginTop: 30,
                            borderWidth: 1, fontSize: 20,
                            borderRadius: 15, borderColor: '#b33939',
                            backgroundColor: '#b33939'
                        }}
                        onPress={() => firebase.auth().signOut()}>

                        <Text style={{
                            color: 'white',
                            fontWeight: '400',
                            paddingTop: '9%',
                            fontSize: 25,
                            alignSelf: 'center',
                            fontWeight: '400'
                        }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}