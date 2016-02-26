import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class Home extends Component {
    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <Text onPress={()=>{
                    Actions.create({name:'asdfasdf'});
                }}>
                    Account
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

export const LayoutComponent = Home;
