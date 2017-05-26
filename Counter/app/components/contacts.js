/**
 * Created by Administrator on 2017/5/10 0010.
 */
import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import AlphabetListView from 'react-native-alphabetlistview';
import SearchBar from 'react-native-material-design-searchbar';
import * as ConstInfo from '../utils/constinfo';
import Hanzi2Pinyin from '../utils/hanzi2pinyin';
import * as contactsactions from '../actions/contactsactions';

class SectionHeader extends Component {
    render() {
        // inline styles used for brevity, use a stylesheet when possible
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

class SectionItem extends Component {
    render() {
        return (
            <Text style={{color:'#f00'}}>{this.props.title}</Text>
        );
    }
}

class Cell extends Component {
    static contextTypes = {
        gotoedit: React.PropTypes.func.isRequired
    }
    //onPress={this.context.gotoedit(this.props.item).bind(this)}
    render() {
        const {gotoedit}=this.context;
        const {item}=this.props;
        return (
            <TouchableOpacity style={{height:30}} onPress={()=>gotoedit(item)}>
                <Text>{item}</Text>
            </TouchableOpacity>
        );
    }
}

class Contacts extends Component {
    getChildContext() {
        return {
            gotoedit: this.props.actions.gotoedit
        }
    }
    static childContextTypes = {
        gotoedit: React.PropTypes.func.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.onSearchChange=this.onSearchChange.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.state = {
            text:"",
            table:{},
            alldata: {},
            data:{}
        };
        //this.fetchData();
    }
    componentDidMount(){
        const {text}=this.state;
        //alert(text+" :update");
        this.fetchData(text);
    }
    fetchData(text) {
        const URL = ConstInfo.host + "/get/api/"+ConstInfo.contactsname;
        let postoptions = {};
        postoptions.method = 'post';
        fetch(URL, postoptions)
            .then(response => {
                if (!response.ok) {
                    alert("网络不通！");
                    return;
                }
                response.json().then(json => {
                    let data = {};
                    let table={};
                    //jsonarray没有length属性
                    //const len = json.length;
                    for (let i in json) {
                        const e = json[i];
                        let hanzi = e._name[0];
                        let pinyin = Hanzi2Pinyin.go(hanzi);
                        let letter = pinyin[0];
                        //判断json是否包含某个key可以，用data[letter] == null 或者用!(letter in data)
                        if (!(letter in data)){
                        //if (data[letter] == null){
                            data[letter] = [];
                            table[letter]=[];
                        }
                        data[letter].push(e._name);
                        table[letter].push(e);
                    }
                    data=ConstInfo.wwmSort(data);
                    let fd=ConstInfo.filter(data,text);
                    this.setState({alldata:data,data: fd,table:table});
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onSearchChange(text) {
        //this.setState({text:text});
        this.fetchData(text);
    }

    render() {
        let {data}=this.state;
        let html1=<View  style={{flexDirection: 'column', height:ConstInfo.height-30-45}}>
                <SearchBar
                    onSearchChange={this.onSearchChange}
                    height={30}
                    onFocus={() => console.log('On Focus')}
                    onBlur={() => console.log('On Blur')}
                    placeholder={'搜索'}
                    autoCorrect={false}
                    padding={5}
                    returnKeyType={'search'}
                />
            </View>;
        let html2=<View  style={{flexDirection: 'column', height:ConstInfo.height-30-45}}>
            <SearchBar
                onSearchChange={this.onSearchChange}
                height={30}
                onFocus={() => console.log('On Focus')}
                onBlur={() => console.log('On Blur')}
                placeholder={'搜索'}
                autoCorrect={false}
                padding={5}
                returnKeyType={'search'}
            />
            <AlphabetListView
                data={data}
                cell={Cell}
                cellHeight={30}
                sectionListItem={SectionItem}
                sectionHeader={SectionHeader}
                sectionHeaderHeight={22.5}
            />
        </View>;

        let html3=html1;
        for(let d in data){
            html3=html2;
            break;
        }
        //if(data.length>0)  词典没有length属性

        //30是searchbar的高度
        //45是wwmtabbar的高度
        //View必须设置flexDirection: 'column',并且设置合适的height属性值
        //这里的View不能变成ScrollView,否则AlphabetListView的高度计算会出问题，导致AlphabetListView出现各种问题
        return (
            html3
        );
    }
}

const mapDispatchToProps=(dispatch)=> {
    return {
        actions: bindActionCreators(contactsactions,dispatch)
    }
};
export default connect(null,mapDispatchToProps)(Contacts);

const styles=StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    viewStyle : {
        backgroundColor: '#ccc'
    }
});