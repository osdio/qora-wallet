import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    Switch
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
const modalWidth = width * 0.8;
const modalHeight = 160;
const switchONText = '点击关闭密码缓存';
const switchOFFText = '点击打开密码缓存';


class Unlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: ''
        };
    }


    _resetPwd() {
        this.setState({
            pwd: '',
            shouldUnlockWallet: false
        });
    }


    _onPress() {
        const { resolved, actions, wallet } = this.props;
        const { pwd } = this.state;
        if (!pwd) {
            return actions.toast('密码不能为空');
        }
        if (this.state.shouldUnlockWallet) {
            actions.decryptWallet({
                pwd,
                encryptWallet: wallet.encryptWallet
            });
        }
        resolved && resolved(this.state.pwd);
        actions.closeUnlock();
        this._resetPwd();
    }


    _close() {
        const { rejected, actions } = this.props;
        rejected && rejected();
        actions.closeUnlock();
        this._resetPwd();
    }


    render() {
        const unlockWallet = (
            <View style={ styles.unlockWallet}>
                <Switch
                    onValueChange={(value) => this.setState({shouldUnlockWallet: value})}
                    style={ styles.switchBtn }
                    value={this.state.shouldUnlockWallet}/>
                <Text style={ styles.unlockWalletText }>
                    { this.state.shouldUnlockWallet ? switchONText : switchOFFText }
                </Text>
            </View>
        );

        if (!this.props.show) {
            return null;
        }
        return (
            <View style={ styles.container }>
                <View style={ styles.body }>
                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({
                        pwd:text
                    })}
                        value={this.state.pwd}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        selectionColor="#4845aa"
                        autoFocus={ true }
                    />
                    <View style={ styles.toolbar }>
                        <Button style={styles.button} onPress={this._onPress.bind(this)}>
                            Unlock
                        </Button>
                    </View>

                    { this.props.showSwitch && unlockWallet }

                    <View style={ styles.iconWrapper }>
                        <TouchableOpacity onPress={this._close.bind(this)}>
                            <Icon size={26} style={ styles.closeIcon } name="close"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        left: 0,
        top: 0,
        height,
        width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        width: modalWidth
    },
    input: {
        height: 40,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#4845aa'
    },
    button: {
        color: '#4845aa'
    },
    toolbar: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconWrapper: {
        position: 'absolute',
        top: -(10 + 26),
        right: 0,
        backgroundColor: 'transparent',
    },
    closeIcon: {
        color: 'white'
    },
    unlockWallet: {
        width: modalWidth - 20 * 2,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switchBtn: {
        flex: 2
    },
    unlockWalletText: {
        flex: 5,
        textAlign: 'right',
        color: 'rgba(0,0,0,0.5)'
    }
});


export const LayoutComponent = Unlock;
export function mapStateToProps(state) {
    return {
        wallet: state.wallet,
        ...state.utils.unlock
    }
}

