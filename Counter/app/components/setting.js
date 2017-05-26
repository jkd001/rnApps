/**
 * Created by Administrator on 2017/4/24 0024.
 */
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput
} from 'react-native';
import * as SaveActions from '../actions/saveActions';
import * as MapChinese2English from '../utils/mapchinese2english';
import * as TComb from 'tcomb-form-native';

class Setting extends Component {
    constructor(props){
        super(props);
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>注册</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        marginTop: 5,
        padding: 5,
        backgroundColor: '#ffffff',
    },
    listview: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: '#F5FCFF',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    row: {
        flexDirection:"row",
        alignItems: 'center',
        marginBottom: 20
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom:5
    },
    textinput:{
        width:100
    }
});
export default Setting;