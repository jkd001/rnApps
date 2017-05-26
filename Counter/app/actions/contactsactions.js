import * as types from './actionTypes';
import * as ConstInfo from '../utils/constinfo';
const HOST=ConstInfo.host;
const POSTURL="/post/api/1.1/";
export const gotoedit=(item)=> {
    return {
        type: types.S_CONTACTS_gotoedit,
        data:item
    };
};
export const gotoall=()=> {
    return {
        type: types.S_CONTACTS_gotoall
    };
};



