import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    Animated,
    Dimensions,
    Text
} from 'react-native';
import Spinner from './Spinner';


const { height, width } = Dimensions.get('window');
const loadingHeight = 80;


class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0.4)
        };
    }


    componentDidMount() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 300
        }).start();
    }


    render() {
        const opacity = {
            opacity: this.state.fadeAnim
        };
        return (
            <Animated.View style={[styles.container, this.props.style, opacity]}>
                <Spinner color="white" style={styles.spinner}/>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: loadingHeight,
        left: (width - loadingHeight) / 2,
        top: (height - loadingHeight) / 2,
        padding: 20,
        height: loadingHeight
    },
    spinner: {}
});


export default Loading;


