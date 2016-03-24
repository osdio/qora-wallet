import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    Clipboard
} from 'react-native';
import QRCode from 'react-native-qrcode';


const {height, width} = Dimensions.get('window');


class Request extends Component {
    render() {
        const { address, balance, actions } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.balance}>
                        <Text>
                            余额:
                        </Text>
                        <Text onPress={()=> this.setState({
                            amount: (balance - 10).toString() || ''}
                        )}>
                            { balance }
                        </Text>
                    </View>


                    <View style={styles.qrWrapper}>
                        <QRCode
                            value={address}
                            size={200}
                            bgColor='#4845aa'
                            fgColor='white'/>
                    </View>

                    <TouchableOpacity onPress={()=>{
                        Clipboard.setString(address);
                        actions.toast('Copied')
                    }}>
                        <Text style={styles.address}>
                            { address }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        backgroundColor: 'white'
    },
    form: {
        height: 40 * 7 + 70,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20
    },
    balance: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    qrWrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    address: {
        textAlign: 'center'
    }
});


export const LayoutComponent = Request;
export function mapStateToProps(state) {
    return {
        transactionUI: state.transactionUI,
        balance: parseFloat(state.account.balance),
        address: state.account.address
    };
}


