import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';


export const toast = createAction(types.TOAST, (text, timeout)=> {
    return {
        text,
        timeout,
        id: new Date().getTime()
    }
});


export const openUnlock = createAction(types.OPEN_UNLOCK, ({resolved, rejected, showSwitch=true})=> {
    return {
        resolved,
        rejected,
        showSwitch
    }
});


export const closeUnlock = createAction(types.CLOSE_UNLOCK);
