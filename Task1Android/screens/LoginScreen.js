import React, { Component } from 'react';
import {
    TouchableOpacity, Keyboard, ImageBackground,
    Text, Animated, TextInput, Dimensions,
    View, KeyboardAvoidingView, Alert
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid'
import SplashIcon from './SplashIcon';
import Loading from './Loading';
import { Facebook } from 'expo';
import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDaUQ3NMQp42KY0xACTWT7jG_MxZ3cgilk",
    authDomain: "task1makhbouz.firebaseapp.com",
    databaseURL: "https://task1makhbouz.firebaseio.com",
    projectId: "task1makhbouz",
    storageBucket: "task1makhbouz.appspot.com",
    messagingSenderId: "735102739592"
};
firebase.initializeApp(config);

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
        }
    }
    signUpUser = (email, password) => {
        this.setState({ loading: true });
        if (!this.state.email) {
            Alert.alert("Please enter email")
            this.setState({ loading: false });
            return;
        }
        if (this.state.password.length < 6) {
            Alert.alert("Please enter at least 6 characters")
            this.setState({ loading: false });
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(
            email, password).then(() => {
                this.setState({ loading: false });
                this.props.navigation.navigate('Hello')
            }).catch((error) => {
                this.setState({ loading: false });
                Alert.alert(error.message)
            }
            )
    }

    loginUser = (email, password) => {
        this.setState({ loading: true });
        if (!this.state.email) {
            this.setState({ loading: false });
            Alert.alert("Please enter email")
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({ loading: false });
            Alert.alert("Please enter at least 6 characters")
            return;
        }
        firebase.auth().signInWithEmailAndPassword(
            email, password).then((user) => {
                console.log(user)
                this.setState({ loading: false });
                this.props.navigation.navigate('Hello')
            }).catch((error) => {
                this.setState({ loading: false });
                Alert.alert(error.message)
            }
            )
    }

    async loginWithFacebook() {
        const { type, token } =
            await Facebook.logInWithReadPermissionsAsync('2220739784636435',
                { permissions: ['public_profile'] })
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(
                token
            )
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                .catch((error) => { Alert.alert(error.message) })
        }
    }

    componentDidMount() {
        Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();
        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    this.props.navigation.navigate('hello');
                } else {
                    this.props.navigation.navigate('auth');
                }
            }
        );
    }

    opacityAnim = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 200,
            delay: 100
        }).start();
    };

    positionAnim = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    render() {
        let screenWidth = Dimensions.get('window').width;
        const { opacity } = this.state;
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <KeyboardAvoidingView behavior="padding" enabled>

                <ImageBackground
                    source={require('../images/Makhbouz.jpg')}
                    style={{
                        width: screenWidth,
                        height: '100%', marginTop: 22
                    }}>

                    <View style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                        <Animated.View
                            style={{
                                flex: 1,
                                transform: [
                                    {
                                        translateY: this.state.position.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [150, 0],
                                        })
                                    },
                                    {
                                        scaleY: this.state.position.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.4],
                                        })
                                    },
                                    {
                                        scaleX: this.state.position.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.4],
                                        })
                                    },
                                ],
                            }}>
                            <SplashIcon />
                        </Animated.View>
                        <Animated.View style={{flex:1.6, opacity }}>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 30, color: 'white'
                            }}>
                                DUBAI'S FIRST & BEST</Text>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 35, color: 'white', fontWeight: 'bold'
                            }}>
                                BAKERY DELIVERY</Text>

                            <TextInput
                                style={{
                                    alignSelf: 'center', paddingTop: 10,
                                    paddingBottom: 10, width: '90%', paddingLeft: 10,
                                    borderWidth: 1, color: 'white', fontSize: 20,
                                    borderRadius: 15, borderColor: 'white'
                                }}
                                placeholder='Email' placeholderTextColor='white'
                                returnKeyType='next'
                                onSubmitEditing={() => this.secondTextInput.focus()}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            >
                            </TextInput>
                            <TextInput
                                style={{
                                    alignSelf: 'center', paddingTop: 10,
                                    paddingBottom: 10, width: '90%', marginTop: 10, paddingLeft: 10,
                                    borderWidth: 1, color: 'white', fontSize: 20,
                                    borderRadius: 15, borderColor: 'white',
                                }}
                                placeholder='Password' placeholderTextColor='white'
                                secureTextEntry returnKeyType="go"
                                ref={(input) => this.secondTextInput = input}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}>
                            </TextInput>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center', paddingTop: 10,
                                    paddingBottom: 10, width: '90%', marginTop: 10,
                                    borderWidth: 1, fontSize: 20,
                                    borderRadius: 15, borderColor: '#F8EFBA',
                                    backgroundColor: '#F8EFBA'
                                }}
                                onPress={() => this.loginUser(this.state.email,
                                    this.state.password)}>

                                <Text style={{
                                    color: '#b33939',
                                    fontWeight: '400',
                                    fontSize: 18,
                                    alignSelf: 'center'
                                }}>Start with Makhbouz</Text>
                            </TouchableOpacity>
                            <Grid>
                                <Row>
                                    <Col>
                                        <TouchableOpacity
                                            style={{
                                                alignSelf: 'center', paddingTop: 10,
                                                paddingBottom: 10, width: '100%', marginTop: 10, marginLeft: 45,
                                                borderWidth: 1, fontSize: 20,
                                                borderRadius: 15, borderColor: '#3c40c6',
                                                backgroundColor: '#3c40c6'
                                            }}
                                            onPress={() => this.loginWithFacebook()}
                                        >
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: '400',
                                                fontSize: 18,
                                                alignSelf: 'center'
                                            }}>Sign with Facebook</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity
                                            style={{
                                                alignSelf: 'center', paddingTop: 10,
                                                paddingBottom: 10, width: '75%', marginTop: 10, marginLeft: 15,
                                                borderWidth: 1, fontSize: 20,
                                                borderRadius: 15, borderColor: '#b33939',
                                                backgroundColor: '#b33939'
                                            }}
                                            onPress={() => this.signUpUser(this.state.email,
                                                this.state.password)}>

                                            <Text style={{
                                                color: 'white',
                                                fontWeight: '400',
                                                fontSize: 20,
                                                alignSelf: 'center'
                                            }}>Sign Up</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </Grid>

                        </Animated.View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}