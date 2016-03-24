import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import Button from '../components/base/Button';
import Loading from '../components/base/Loading';
import mapHttpResultToStatus from '../utils/mapHttpResultToStatus';


const {height, width} = Dimensions.get('window');


class RegisterName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: '',
            fee: '10'
        };
    }


    _onPress() {
        if (this.sending) return;
        const {actions} = this.props;
        const {name, fee, value} = this.state;
        const {toast} = actions;

        if (!name) {
            return toast('名字不能为空');
        }

        if (!value) {
            return toast('value不能为空');
        }


        this.sending = true;

        actions.registerName({
            fee,
            name: name.toLowerCase().trim(),
            value: value.toLowerCase().trim(),
            resolved: (result)=> {
                this.sending = false;
                if (typeof result === 'object' && result.timestamp) {
                    actions.toast('发送成功');
                    this.props.router.pop();
                }
                else {
                    actions.toast(`发送失败[${mapHttpResultToStatus[result]}]`)
                }
            },
            rejected: ()=> {
                this.sending = false;
                actions.toast('发送失败');
            }
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.balance}>
                        <Text>
                            余额:
                        </Text>
                        <Text onPress={()=> this.setState({
                            amount: (this.props.balance - 10).toString() || ''}
                        )}>
                            { this.props.balance }
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={[styles.input, styles.recipientInput ]}
                            onChangeText={(text) => this.setState({
                                name: text.toLowerCase()
                            })}
                            value={this.state.name}
                            placeholder="请输入注册名字"
                            selectionColor="#4845aa"
                            autoFocus={ true }
                        />
                    </View>

                    <TextInput
                        style={[styles.input, styles.multiInput ]}
                        onChangeText={(text) => this.setState({
                            value: text
                        })}
                        value={this.state.value}
                        placeholder="请输入注册名字的value"
                        multiline={true}
                        selectionColor="#4845aa"
                        keyboardType="numeric"
                    />


                    <View style={styles.buttonWrapper}>
                        <Button style={styles.button} containerStyle={{flex:1}} onPress={this._onPress.bind(this)}>
                            Register
                        </Button>
                    </View>
                </View>
                { this.props.transactionUI.registerNamePending && <Loading style={styles.loading}/>}
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
        height: 40 * 6 + 70,
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
    multiInput: {
        height: 40 * 3,
        fontSize: 16
    },
    recipientInput: {
        paddingRight: 60
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
        color: 'white',
        flex: 1
    },
    loading: {
        top: (height - 80 - 64) / 2
    },
    cameraBtn: {
        position: 'absolute',
        right: 15,
        top: (40 - 30) / 2
    },
    balance: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


export const LayoutComponent = RegisterName;
export function mapStateToProps(state) {
    return {
        transactionUI: state.transactionUI,
        balance: parseFloat(state.account.balance)
    };
}


