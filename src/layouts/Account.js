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
        const { actions, account } = this.props;
        actions.getWalletFormStorage({
            resolved: ()=> {
                //Actions.createWallet();
            },
            rejected: ()=> {
                Actions.createWallet();
            }
        });
        actions.getAddressInfoFromStorage(({ address })=> {
            actions.getAddressInfo(address);
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View>

                </View>
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
    return {
        wallet: state.wallet,
        walletUI: state.walletUI,
        account: state.account
    };
}

export const LayoutComponent = Home;
