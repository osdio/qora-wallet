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
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import * as UtilsComponent from './Utils';
import connectComponent from '../utils/connectComponent';
import * as Setting from './Setting';
import * as Block from './Block';
import * as Account from './Account';


const Utils = connectComponent(UtilsComponent);
const { height, width } = Dimensions.get('window');


class TabIcon extends React.Component {
    render() {
        return (
            <Text style={{color: this.props.selected ? '#4845aa' :'black'}}>{this.props.title}</Text>
        );
    }
}


class Navigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Router hideNavBar={true}>
                    <Schema name="tab" type="switch" icon={TabIcon}/>


                    <Route name="tabbar" initial={true}>
                        <Router footer={TabBar}
                                showNavigationBar={false}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                                tabBarStyle={styles.tabBarStyle}>
                            <Route name="account" schema="tab" title="Account" component={connectComponent(Setting)}/>
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
