import React,{
    Component,
    PropTypes,
    Navigator,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import RNRF, {Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import TabIcon from '../components/base/TabIcon';
import { customFloatFromBottom } from '../configs/sceneConfig';
import connectComponent from '../utils/connectComponent';
import Layouts from './index';


const { height, width } = Dimensions.get('window');
const Router = connect()(RNRF.Router);


let components = {};
Object.keys(Layouts).forEach((key)=> {
    components[key] = connectComponent(Layouts[key]);
});


class Navigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Router hideNavBar={true}>
                    <Schema name="tab" type="switch" icon={TabIcon}/>
                    <Schema name="modal" sceneConfig={customFloatFromBottom}/>


                    <Route name="home" initial={true}>
                        <Router footer={TabBar}
                                showNavigationBar={false}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                                tabBarStyle={styles.tabBarStyle}>
                            <Route name="account" schema="tab" title="Account" component={components.Account}/>
                            <Route name="block" schema="tab" title="Block" component={components.Block}/>
                            <Route name="setting" schema="tab" title="Setting" component={components.Setting}/>
                        </Router>
                    </Route>


                    <Route name="createWallet" type="push" schema="modal" initial={false}>
                        <Router titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}>
                            <Route name="createModal1" initial={true} component={components.CreateWallet}
                                   schema="modal"
                                   title="Create Wallet"/>
                            <Route name="createModal2" component={components.EncryptWallet}
                                   title="Encrypt Wallet"/>
                        </Router>
                    </Route>


                </Router>
                <components.Utils/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height,
        width
    },
    navigationBarStyle: {
        backgroundColor: '#4845aa',
        borderBottomWidth: 0
    },
    tabBarStyle: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderTopWidth: 1
    },
    titleStyle: {
        color: 'white'
    }

});


export default Navigation;
