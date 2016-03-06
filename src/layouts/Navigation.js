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
import * as  Home from './Home'
import * as UtilsComponent from './Utils';
import Scene from '../components/base/Scene';
import Router from '../configs/Router';
import connectComponent from '../utils/connectComponent';
import config from '../configs';

const Utils = connectComponent(UtilsComponent);

const { height, width } = Dimensions.get('window');
const initialRoute = {
    name: 'account',
    index: 0,
    component: connectComponent(Home),
    id: 0,
    showNav: false
};


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.ids = [];
        this.state = {
            page: initialRoute.name
        }
    }


    componentDidMount() {
        this.navigator.navigationContext.addListener('didfocus', e => {
            const { index, id } = e.data.route;
            const haveFocused = this.ids.indexOf(id) > -1;
            this[index] && this[index] && this[index].getWrappedInstance().componentDidFocus && this[index].getWrappedInstance().componentDidFocus(haveFocused);
            !haveFocused && this.ids.push(id);
        });
    }


    renderScene(route, navigator) {
        var { component, name, props, id, index }=route;
        this.router = this.router || new Router(navigator);
        if (component) {
            return (
                <Scene {...route} {...props} router={this.router}>
                    {
                        React.createElement(component, {
                            ...props,
                            ref: view => this[index] = view,
                            router: this.router,
                            route: {
                                name,
                                id,
                                index
                            }
                        })
                    }
                </Scene>
            );
        }
    }


    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig
        }
        return Navigator.SceneConfigs.FloatFromRight
    }


    render() {
        return (
            <View style={styles.bg}>
                <Navigator
                    ref={view => this.navigator=view}
                    initialRoute={initialRoute}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}/>
                <Utils/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bg: {
        flex: 1,
        height,
        width,
        backgroundColor: 'transparent'
    }
});


export const LayoutComponent = Navigation;
export function mapStateToProps(state) {
    return {}
}
