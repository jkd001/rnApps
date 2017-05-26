import * as types from '../actions/actionTypes';

const initialState = {
  pageidx: 0
};
const s_setting=(state = initialState, action = {})=>{
    switch (action.type) {
        case types.S_SETTINGS_gotologin:
            return {
                pageidx: 1
            };
        case types.S_SETTINGS_gotosetting:
            return {
                pageidx: 0
            };
        default:
            return state;
    }
};
export default s_contacts;
