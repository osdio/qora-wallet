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
import * as UtilsComponent from './Utils';
import connectComponent from '../utils/connectComponent';
import * as Setting from './Setting';
import * as Block from './Block';
import * as Account from './Account';
import * as CreateWallet from './CreateWallet';
import * as EncryptWallet from './EncryptWallet';
import { customFloatFromBottom } from '../configs/sceneConfig';


const Utils = connectComponent(UtilsComponent);
const { height, width } = Dimensions.get('window');
const Router = connect()(RNRF.Router);


class Navigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Router hideNavBar={true}>
                    <Schema name="tab" type="switch" icon={TabIcon}/>
                    <Schema name="modal" sceneConfig={customFloatFromBottom}/>


                    <Route name="create" schema="modal" initial={true}>
                        <Router titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}>
                            <Route name="createModal1" initial={true} component={connectComponent(CreateWallet)}
                                   schema="modal"
                                   title="Create Wallet"/>
                            <Route name="createModal2" component={connectComponent(EncryptWallet)}
                                   title="Encrypt Wallet"/>
                        </Router>
                    </Route>


                    <Route name="tabbar" initial={false}>
                        <Router footer={TabBar}
                                showNavigationBar={false}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                                tabBarStyle={styles.tabBarStyle}>
                            <Route name="account" schema="tab" title="Account" component={connectComponent(Account)}/>
                            <Route name="block" schema="tab" title="Block" component={connectComponent(Block)}/>
                            <Route name="setting" schema="tab" title="Setting" component={connectComponent(Setting)}/>
                        </Router>
                    </Route>
                </Router>
                <Utils/>
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
        backgroundColor: '#4845aa'
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
