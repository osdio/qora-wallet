import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import Tabs from 'react-native-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Nav from '../components/base/Nav';
import Scene from '../components/base/Scene';
import Spinner from '../components/base/Spinner';
import * as Account from './Account';
import * as Setting from './Setting';
import * as Block from './Block';
import connectComponent from '../utils/connectComponent';


const TABS = {
    account: connectComponent(Account),
    setting: connectComponent(Setting),
    block: connectComponent(Block)
};

const iconNameMap = {
    'account': 'person',
    'block': 'ios-pulse-strong',
    'setting': 'ios-gear'
};


const tabNameMapToTitle = {
    account: 'Account',
    block: 'Block',
    setting: 'Setting'
};


const INITIAL_PAGE = 'account';
const { height, width } = Dimensions.get('window');
const SCENE_DISABLED_NATIVE_PROPS = {
    pointerEvents: 'none',
    style: {
        top: height,
        bottom: -width,
        opacity: 0
    }
};

const flagSize = 15;


class Home extends Component {
    constructor(props) {
        super(props);
        this._tabs = {};
        this.state = {
            selected: INITIAL_PAGE
        };
        this.pages = [
            {
                id: INITIAL_PAGE,
                component: this._renderPage(TABS[INITIAL_PAGE], INITIAL_PAGE)
            }
        ];
    }


    _unlockPress() {
        const { actions, wallet } = this.props;
        if (!wallet.seed) {
            actions.openUnlock({
                showSwitch: false,
                resolved: (pwd)=> {
                    actions.decryptWallet({
                        encryptWallet: wallet.encryptWallet,
                        pwd,
                        resolved: ()=> actions.toast('解锁成功'),
                        rejected: ()=> actions.toast('密码错误')
                    });
                }
            });
        }
        else {
            actions.lock();
            actions.toast('locked');
        }
    }


    _renderPage(PageComponent, name) {
        return (
            <View ref={view=>this._tabs[name]=view} key={name} style={styles.baseScene}>
                <PageComponent {...this.props}/>
            </View>
        )
    }


    _indexOf(id, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                return i;
            }
        }
        return -1;
    }


    _onTabSelect(el) {
        const { tab } = el.props;
        if (tab === this.state.selected) return;
        const enabledSceneNativeProps = {
            pointerEvents: 'auto',
            style: styles.baseScene
        };

        const index = this._indexOf(tab, this.pages);

        if (index > -1) {
            this._tabs[this.state.selected].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
            this._tabs[tab].setNativeProps(enabledSceneNativeProps);
            this.setState({
                selected: tab
            });
        }
        else {
            this._tabs[this.state.selected].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
            this.pages.push({
                id: tab,
                component: this._renderPage(TABS[tab], tab)
            });
            this.setState({
                selected: tab
            });
        }
    }


    _renderTabIcon() {
        return Object.keys(iconNameMap).map((key)=> {
            const { unconfirmedTransaction=[] } = this.props.transaction;
            const length = unconfirmedTransaction.length;
            return (
                <View key={key} tab={key}>
                    <Icon name={iconNameMap[key]} key={key} size={26} tab={key}
                          style={ this.state.selected===key ? styles.selected : styles.icon }/>
                    { key === 'block' && length > 0 && this._renderFlag(length) }
                </View>
            )
        });
    }


    _renderFlag(text) {
        return (
            <View style={ styles.flag }>
                <Text style={ styles.flagText }>
                    { text }
                </Text>
            </View>
        )
    }


    _renderNavLoading() {
        if (this.props.accountUI.getAddressBalancePending) {
            return (
                <View style={{ flex:1, flexDirection:'row', justifyContent:'flex-end' }}>
                    <Spinner styleAttr="Small" color="white"/>
                </View>
            )
        }
        return null;
    }


    render() {
        const { wallet } = this.props;
        return (
            <View style={ styles.container }>
                <Nav renderRightItem={ this._renderNavLoading.bind(this) }
                     leftIcon={ wallet.seed ? 'unlocked' : 'locked' }
                     leftPress={this._unlockPress.bind(this)}
                     center={ tabNameMapToTitle[this.state.selected] }/>
                { this.pages.map(page => page.component) }
                <Tabs selected={this.state.selected} style={ styles.tabs }
                      selectedStyle={{color:'red'}} onSelect={this._onTabSelect.bind(this)}>

                    { this._renderTabIcon() }

                </Tabs>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    baseScene: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        bottom: 0,
        top: Scene.navHeight,
        opacity: 1
    },
    tabs: {
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderTopWidth: 1
    },
    selected: {
        color: '#4845aa'
    },
    icon: {
        color: 'rgba(0,0,0,0.8)'
    },
    flag: {
        position: 'absolute',
        top: -10,
        right: -14,
        height: flagSize,
        width: flagSize,
        borderRadius: flagSize,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flagText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 9
    }
});


export const LayoutComponent = Home;
export function mapStateToProps(state) {
    return {
        transaction: state.transaction,
        accountUI: state.accountUI,
        wallet: state.wallet
    };
}


