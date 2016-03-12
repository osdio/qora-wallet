import React,{
    Component,
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import Toast from '../components/base/Toast';
import * as UnlockComponent from './Unlock';
import connectComponent from '../utils/connectComponent';


const Unlock = connectComponent(UnlockComponent);


class Utils extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.toast.id !== nextProps.toast.id) {
            this.toast.show(nextProps.toast.text, nextProps.toast.timeout);
        }
    }


    componentDidMount() {
        const { actions, unlock } = this.props;
    }


    render() {
        const { actions, unlock } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Unlock/>
                <Toast ref={ (view)=> this.toast=view }/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});


export const LayoutComponent = Utils;
export function mapStateToProps(state) {
    const { utils = {} } = state;
    return {
        ...utils
    }
}
