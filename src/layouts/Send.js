import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    TextInput
} from 'react-native';
import Button from '../components/base/Button';


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
        const { pwd, amount, fee, recipient }=this.state;
        const { address } = account;
        actions.send({
            encryptWallet: wallet.encryptWallet,
            pwd,
            address,
            amount,
            fee,
            recipient
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
    }
});


export const LayoutComponent = Send;
export function mapStateToProps(state) {
    return {
        account: state.account,
        wallet: state.wallet
    };
}


