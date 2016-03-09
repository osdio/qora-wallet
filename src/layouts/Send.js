import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    TextInput,
    Dimensions
} from 'react-native';
import Button from '../components/base/Button';
import Loading from '../components/base/Loading';


const { height, width } = Dimensions.get('window');

const mapResultToStatus = {
    1: 'VALIDATE_OK',
    2: 'INVALID_ADDRESS',
    3: 'NEGATIVE_AMOUNT',
    4: 'NEGATIVE_FEE',
    5: 'NO_BALANCE',
    6: 'INVALID_REFERENCE',
    7: 'INVALID_NAME_LENGTH',
    8: 'INVALID_VALUE_LENGTH',
    9: 'NAME_ALREADY_REGISTRED',
    15: 'INVALID_AMOUNT',
    17: 'NAME_NOT_LOWER_CASE',
    27: 'INVALID_DATA_LENGTH',
    34: 'INVALID_PAYMENTS_LENGTH',
    40: 'FEE_LESS_REQUIRED',
    41: 'INVALID_RAW_DATA',
    1000: 'NOT_YET_RELEASED'
};


class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            amount: '',
            fee: '10',
            pwd: ''
        };
    }


    _onPress() {
        const { wallet={}, actions, account={} } = this.props;
        const { pwd, amount, fee, recipient } = this.state;
        const { address } = account;
        actions.send({
            encryptWallet: wallet.encryptWallet,
            pwd,
            address,
            amount,
            fee,
            recipient,
            resolved: (result)=> {
                console.log(result);
                if (typeof result === 'object' && result.timestamp) {
                    actions.toast('发送成功');
                    this.props.router.pop();
                }
                else {
                    actions.toast(`发送失败[${mapResultToStatus[result]}]`)
                }
            },
            rejected: ()=> {
                actions.toast('发送失败');
            }
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({
                        recipient:text
                    })}
                        value={this.state.recipient}
                        placeholder="请输入收款地址"
                        selectionColor="#4845aa"
                        autoFocus={ true }
                    />

                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({
                        amount:text
                    })}
                        value={this.state.amount}
                        placeholder="请输入打款数额"
                        selectionColor="#4845aa"
                        keyboardType="numeric"
                    />


                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({
                        pwd:text
                    })}
                        value={this.state.pwd}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        selectionColor="#4845aa"
                    />


                    <TextInput
                        style={[styles.input, {color: 'rgba(0,0,0,0.5)'}]}
                        onChangeText={(text) => this.setState({
                        fee:text
                    })}
                        value={this.state.fee}
                        placeholder="请输入手续费"
                        selectionColor="#4845aa"
                        keyboardType="numeric"
                        editable={false}
                    />

                    <View style={styles.buttonWrapper}>
                        <Button style={styles.button} onPress={this._onPress.bind(this)}>
                            Send
                        </Button>
                    </View>
                </View>
                { this.props.transactionUI.sendPending && <Loading style={styles.loading}/>}
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
        height: 40 * 5 + 70,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonWrapper: {
        backgroundColor: '#4845aa',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 45
    },
    button: {
        color: 'white'
    },
    loading: {
        top: (height - 80 - 64) / 2
    }
});


export const LayoutComponent = Send;
export function mapStateToProps(state) {
    return {
        account: state.account,
        wallet: state.wallet,
        transactionUI: state.transactionUI
    };
}


