import React, {
    Component,
    Dimensions,
    View,
    Platform,
    StyleSheet,
    PropTypes
} from 'react-native';
import Nav from './Nav';

const { height, width } = Dimensions.get('window');


const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const navHeight = statusBarHeight + 45;


class Scene extends Component {
    static statusBarHeight = statusBarHeight;
    static navHeight = navHeight;
    static propTypes = {
        showNav: PropTypes.bool
    };

    static defaultProps = {
        showNav: true
    };

    render() {
        var style = {};
        if (this.props.showNav) {
            style = {
                height: height - navHeight
            }
        }
        else {
            style = {
                flex: 1
            }
        }

        return (
            <View style={ [styles.container, style] }>
                { this.props.showNav && <Nav {...this.props}/>}
                { this.props.children }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {}
});


export default Scene;
