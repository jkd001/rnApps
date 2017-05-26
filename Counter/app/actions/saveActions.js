import * as types from './actionTypes';
const HOST="http://192.168.1.132:8080";
const POSTURL="/post/api/1.1/";
export const save=(data)=> {
  return {
    type: types.UPLOAD
  };
};

export const upload=(uri)=>{
    let URL=HOST+UPLOADURL;
    let formData = new FormData(value);
    if(data && data.length>0) {
        data.map(e => {
                console.log(e.uri);
                formData.append('file', {
                    uri: e.uri, type: 'application/octet-stream', name: e.uri.split("/")[-1]
                });
            }
        )
    }
    let postoptions = {};
    postoptions.body = formData;
    postoptions.method = 'post';
    fetch(URL, postoptions)
        .then((response)=>response.text())
        .then((responseText)=>{
            console.log(responseText);
        }).catch((error)=>{
        console.log(error);
    });

}