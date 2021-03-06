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
import * as ConstInfo from '../utils/constinfo';
import * as MapChinese2English from '../utils/mapchinese2english';
import * as TComb from 'tcomb-form-native';

let Form = TComb.form.Form;
let Gender = TComb.enums({
    M: '男',
    F: '女'
});
let Person = TComb.struct({
    "姓名": TComb.String,              // a required string
    //"性别": Gender,  // an optional string
    "工作单位": TComb.maybe(TComb.String),               // an optional string
    "职务":TComb.maybe(TComb.String),        // an optional string
    "手机": TComb.maybe(TComb.String),        // an optional string
    "生日":TComb.maybe(TComb.Date),
    "备注":TComb.maybe(TComb.String)        // an optional string
});
// let Person = TComb.struct({
//     name: TComb.String,              // a required string
//     sexy: Gender,  // an optional string
//     workunit: TComb.maybe(TComb.String),               // an optional string
//     job:TComb.maybe(TComb.String),        // an optional string
//     phone: TComb.maybe(TComb.String),        // an optional string
//     birthday:TComb.maybe(TComb.String),
//     memo:TComb.maybe(TComb.String)        // an optional string
// });
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
class NewContact extends Component {
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            avatarSource:{uri:"https://facebook.github.io/react/img/logo_og.png"},
            ds:ds,
            data: []
        };
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
                <Image style={styles.image} source={rowData} />
            </TouchableHighlight>
        );
    };
    onPress= () => {
        //call getValue() to get the values of the form
        let {value, data} = this.state;
        const URL = ConstInfo.host+"/post/api/1.1/contacts";
        let formData = new FormData();
        if (data && data.length > 0) {
            data.map((e, i) => {
                let tmp = e.uri.split("/");
                tmp = tmp[tmp.length - 1];
                console.log(tmp);
                let file = {uri: e.uri, type: 'image/jpeg', name: tmp};
                formData.append("file" + i, file);   //这里的files就是后台需要的key
            });
        }
        for (let key in value) {
            //formData的名字不能是中文
            let key1 = MapChinese2English.mapchinese2english[key];
            let value1 = value[key];
            if (value1 != null && value != "") formData.append(key1, value[key]);
        }
        let postoptions = {};
        postoptions.body = formData;
        ///'Content-Type':'multipart/form-data; boundary=----------------------------7db372eb000e2',
        postoptions.headers = {
            'Content-Type': 'multipart/form-data; boundary=' + MapChinese2English.NewGuid()
        };
        console.log(postoptions.headers['Content-Type']);
        postoptions.method = 'post';
        //delete postoptions.headers['Content-Type'];
        fetch(URL, postoptions)
            .then((response) => {
                alert("保存成功！");
                console.log(response.text());
            })
            .catch((error) => {
                alert("保存成功！");
                console.log(error);
            });
    };
    onChange=(value)=> {
        this.setState({value:value});
    };
    render() {
        let data=this.state.data;
        let ds=this.state.ds;
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
                <Form
                    ref="form"
                    type={Person}
                    options={options}
                    value={this.state.value}
                    onChange={(value)=>this.onChange(value)}
                />
                <TouchableOpacity onPress={()=>this.openMycamera()} style={styles.row}>
                    <Text >相机&相册</Text>
                    {/*<Image source={this.state.avatarSource}  style={styles.image} />*/}
                    {listview}
                </TouchableOpacity>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>保存</Text>
                </TouchableHighlight>
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
                // this.setState({
                //     avatarSource: source
                // });
            }
        })
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

export default NewContact;