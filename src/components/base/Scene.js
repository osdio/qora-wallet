import React, {
    Component,
    Dimensions,
    View,
    Platform,
    StyleSheet,
    PropTypes
} from 'react-native';
import Nav from './Nav';

const {height, width} = Dimensions.get('window');


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
            return (
                <View style={ [styles.container] }>
                    <Nav {...this.props}/>
                    <View style={{height: height-navHeight}}>
                        { this.props.children }
                    </View>
                </View>
            )
        }

        return (
            <View style={ [styles.container] }>
                { this.props.children }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default Scene;
