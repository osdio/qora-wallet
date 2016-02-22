import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';


class Setting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Setting
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export function mapStateToProps(state) {
    return state;
}

export const LayoutComponent = Setting;
