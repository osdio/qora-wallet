import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import TabBarNavigator from 'react-native-tabbar-navigator';


class Home extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export function mapStateToProps(state) {
    return state;
}

export const LayoutComponent = Home;
