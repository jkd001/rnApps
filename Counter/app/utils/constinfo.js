import {
    Dimensions
} from 'react-native';
export const width = Dimensions.get('window').width;           //获取屏幕宽度
export const height = Dimensions.get('window').height;           //获取屏幕高度
export const scale = Dimensions.get('window').scale;           //获取屏幕分辨率
//export const host="http://192.168.1.132:8080";
export const host="http://192.168.122.74:8080";
export const contactsname="testcontacts";
//对象按字段名的顺序重新排序
export const wwmSort=(obj)=>{
    let keys=[];
    for(let key in obj){
        keys.push(key);
    }
    keys.sort();
    let ret={};
    for(let i=0;i<keys.length;i++){
        let key=keys[i];
        //alert(key);
        ret[key]=obj[key];
    }
    return ret;
};

export const filter=(data,text)=>{
    if(text=="")return data;
    let ret={};
    for(let key in data){
        let e=data[key];
        for(let i=0;i<e.length;i++){
            if(e[i].indexOf(text)>-1){
                if(ret[key]==null)ret[key]=[];
                ret[key].push(e[i]);
            }
        }
    }
    return ret;
}
