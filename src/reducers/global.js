import { Actions } from 'react-native-router-flux';

const initialState = {
    currentRoute: 'account'
};


export default function (state = initialState, action) {
    switch (action.type) {
        case Actions.BEFORE_ROUTE:
            return {
                ...state,
                currentRoute: action.name
            };
        case Actions.AFTER_POP:
            return {
                ...state,
                currentRoute: action.name
            };
        default:
            return state;
    }
}
