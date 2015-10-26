'use strict';
import {connect as _connect} from '../../node_modules/react-redux/native';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

export default function connect () {
    var args = [...arguments];
    if (!args[1]) {
        args[1] = function (dispatch) {
            return bindActionCreators(actions, dispatch);
        };
    }
    return _connect.apply(this, args);
}