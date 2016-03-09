import { isFSA, createAction } from 'flux-standard-action';
import * as storageService from '../services/storage';


export default ({ dispatch, getState }) => next => action => {
    if (!isFSA(action)) {
        return next(action);
    }

    const { meta={}, sequence={}, error, payload } = action;
    const { sync } = meta;


    if (meta.syncStatus) {
        let state = getState();
        switch (payload) {
            default:
                storageService.setItem(payload, state[payload]);
        }
    }


    if (!sync || sequence.type == 'start' || error) {
        return next(action);
    }


    next(action);


    dispatch({
        type: 'SYNC_REDUCER_TO_ASYNC_STORAGE',
        payload: sync,
        meta: {
            syncStatus: true
        }
    });

}
