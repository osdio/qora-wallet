import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    TextInput,
    Dimensions
} from 'react-native';
import Button from '../components/base/Button';


const { height, width } = Dimensions.get('window');


class EncryptWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            text2: ''
        };
    }


    _onPress() {
        let { text, text2 } = this.state;
        const { actions, wallet } = this.props;
        text = text.trim();
        text2 = text2.trim();
        if (text.length < 12) {
            return actions.toast('密码应该大于12位');
        }

        if (text !== text2) {
            return actions.toast('两次输入密码不一致');
        }
        actions.encryptWallet({
            pwd: text,
            wallet: {
                seed: wallet.seed,
                account: wallet.account
            },
            resolved: ()=> {
                actions.toast('加密成功');
                this.props.router.resetToHome();
            }
        });
    }


    render() {
        const { wallet } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.content }>
                    <View style={ styles.info }>
                        <Text style={ styles.infoText}>
                            钱包创建成功, 您的seed为:
                        </Text>
                        <Text style={ styles.seed }>
                            { wallet.seed }
                        </Text>
                        <Text style={styles.infoText}>
                            请输入钱包密码, 加密钱包
                        </Text>
                    </View>

                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder="请输入密码"
                        selectionColor="#4845aa"
                        secureTextEntry={true}
                        autoFocus={ true }
                    />

                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({text2: text})}
                        value={this.state.text2}
                        placeholder="请再次输入密码"
                        selectionColor="#4845aa"
                        secureTextEntry={true}
                    />


                    <Button style={ styles.buttonText }
                            containerStyle={ styles.button }
                            onPress={ this._onPress.bind(this)}>
                        加密
                    </Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        height: 300,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 30 * 2
    },
    info: {},
    infoText: {
        color: 'rgba(0,0,0,0.7)',
    },
    input: {
        height: 40,
        borderColor: 'rgba(0,0,0,0.7)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        backgroundColor: '#4845aa',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 45
    },
    buttonText: {
        backgroundColor: '#4845aa',
        paddingRight: 20,
        paddingLeft: 20,
        color: 'rgba(255,255,255,0.9)'
    },
    seed: {
        color: '#4845aa',
        marginBottom: 10,
        marginTop: 10
    }
});


export const LayoutComponent = EncryptWallet;
export function mapStateToProps(state) {
    return {
        wallet: state.wallet
    };
}


