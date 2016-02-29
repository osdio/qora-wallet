import React,{
    Component
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as NavigationLayout from './layouts/Navigation';
import connectComponent from './utils/connectComponent';


const store = configureStore();

const Navigation = connectComponent(NavigationLayout);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}


export default App;
