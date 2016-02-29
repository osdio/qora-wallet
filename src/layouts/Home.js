import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import Tabs from 'react-native-tabs';
import * as Account from './Account';
import * as Setting from './Setting';
import * as Block from './Block';
import connectComponent from '../utils/connectComponent';


const TABS = {
    account: connectComponent(Account),
    setting: connectComponent(Setting),
    block: connectComponent(Block)
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

class Home extends Component {
    constructor(props) {
        super(props);
        this._tabs = {};
        this.state = {
            select: INITIAL_PAGE
        };
        this.pages = [
            {
                id: INITIAL_PAGE,
                component: this._renderPage(TABS[INITIAL_PAGE], INITIAL_PAGE)
            }
        ];
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
        const { name } = el.props;
        if (name === this.state.select) return;
        const enabledSceneNativeProps = {
            pointerEvents: 'auto',
            style: styles.baseScene
        };

        const index = this._indexOf(name, this.pages);

        if (index > -1) {
            this._tabs[this.state.select].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
            this._tabs[name].setNativeProps(enabledSceneNativeProps);
            this.setState({
                select: name
            });
        }
        else {
            this._tabs[this.state.select].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
            this.pages.push({
                id: name,
                component: this._renderPage(TABS[name], name)
            });
            this.setState({
                select: name
            });
        }
    }


    render() {
        return (
            <View style={ styles.container }>
                { this.pages.map(page => page.component) }
                <Tabs selected={this.state.select} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'red'}} onSelect={this._onTabSelect.bind(this)}>
                    <Text name="account">Account</Text>
                    <Text name="block">Block</Text>
                    <Text name="setting">Setting</Text>
                </Tabs>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    baseScene: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        opacity: 1
    },
});


export const LayoutComponent = Home;
export function mapStateToProps(state) {
    return {};
}


