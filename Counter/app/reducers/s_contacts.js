import * as types from '../actions/actionTypes';

const initialState = {
  pageidx: 0
};
const s_contacts=(state = initialState, action = {})=>{
    switch (action.type) {
        case types.S_CONTACTS_gotoedit:
            return {
                pageidx: 1,
                item: action.data
            };
        case types.S_CONTACTS_gotoall:
            return {
                pageidx: 0
            };
        default:
            return state;
    }
};
export default s_contacts;
