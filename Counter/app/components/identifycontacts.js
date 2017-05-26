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
import * as MapChinese2English from '../utils/mapchinese2english';
import * as TComb from 'tcomb-form-native';
import * as contactsactions from '../actions/contactsactions';
import * as ConstInfo from '../utils/constinfo';

let options = {auto: 'placeholders'};
import  ImagePicker from 'react-native-image-picker'; //第三方相机
let photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};
class IdentifyContacts extends Component {
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds:ds,
            data: []
        };
        this.onIdentify=this.onIdentify.bind(this);
    };
    deleteImage=(rowID)=>()=> {
        let data=this.state.data;
        console.log(rowID);
        data.splice(rowID, 1);
        this.setState({
            data: data
        });
    };
    _renderRow=(rowData,sectionID,rowID)=> {
        console.log(rowID);
        let d1=this.deleteImage(rowID);
        return (
            <TouchableHighlight onPress={d1}>
                <Image style={styles.image} source={rowData}></Image>
            </TouchableHighlight>
        );
    };
    onIdentify= () => {
        //call getValue() to get the values of the form
        let {value, data} = this.state;
        let {item} = this.props;
        const URL = ConstInfo.host + "/identifyall/api/"+ConstInfo.contactsname;
        let formData = new FormData();
        if (data == null || data.length == 0) {
            alert("请拍照或选择照片");
            return;
        }
        data.map((e, i) => {
            let tmp = e.uri.split("/");
            tmp = tmp[tmp.length - 1];
            console.log(tmp);
            let file = {uri: e.uri, type: 'image/jpeg', name: tmp};
            formData.append("file" + i, file);   //这里的files就是后台需要的key
        });
        let postoptions = {};
        postoptions.body = formData;
        ///'Content-Type':'multipart/form-data; boundary=----------------------------7db372eb000e2',
        postoptions.headers = {
            'Content-Type': 'multipart/form-data; boundary=' + MapChinese2English.NewGuid()
        };
        postoptions.method = 'post';
        //delete postoptions.headers['Content-Type'];
        fetch(URL, postoptions)
            .then(response => {
                if (!response.ok) {
                    alert("网络不通！");
                    return;
                }
                response.json().then(json => {
                    this.setState({resultimg:json.file})
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    onChange=(value)=> {
        this.setState({value:value});
    };
    render() {
        const {data,ds,resultimg}=this.state;
        let url=ConstInfo.host+"/showimg/api/";
        let source = {uri: url+resultimg};
        const {actions}=this.props;
        let listview=<Text>请选择照片</Text>;
        if(data.length>0){
            let datasource=ds.cloneWithRows(data);
            listview=<ListView style={styles.listview}
                               dataSource={datasource}
                               renderRow={ this._renderRow}
            />;
        }
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={()=>this.openMycamera()} style={styles.row}>
                    <Text >相机&相册</Text>
                    {listview}
                </TouchableOpacity>
                <TouchableHighlight style={styles.button} onPress={this.onIdentify} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>识别</Text>
                </TouchableHighlight>
                <Image style={styles.image2} source={source}></Image>
            </ScrollView>
        );
    };
    openMycamera = () =>{
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            //console.log('response'+response);
            if (response.didCancel){
                console.log("didcancel");
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let data=this.state.data;
                data.push(source);
                this.setState({
                    data:data
                });
            }
        })
    };
}
export default IdentifyContacts;
const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        marginTop: 5,
        padding: 5,
        backgroundColor: '#ffffff',
    },
    listview: {
        flexDirection:"column",
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
    image2:{
        width:ConstInfo.width-30,
        height: ConstInfo.height-120
    },
    textinput:{
        width:100
    }
});

