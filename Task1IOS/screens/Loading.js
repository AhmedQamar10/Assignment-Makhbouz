import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#b33939'
            }}>
                <ActivityIndicator size='large' color='white' />
            </View>
        )
    }
}