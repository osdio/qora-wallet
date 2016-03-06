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


class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }


    _onPress() {
        let { text } = this.state;
        const { actions } = this.props;
        text = text.trim();
        if (text.length < 8) {
            return actions.toast('密码必须大于8位')
        }


        actions.createWallet({
            pwd: this.state.text,
            resolved: ()=> {
                actions.toast('钱包创建成功');
                this.props.router.toEncryptWallet();
            }
        });
    }


    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.content }>
                    <Text style={ styles.info }>
                        请输入您的密码, 请妥善保管您的密码
                    </Text>
                    <TextInput
                        style={ styles.input }
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder="请输入密码"
                        selectionColor="#4845aa"
                        autoFocus={ true }
                    />


                    <Button style={ styles.buttonText }
                            containerStyle={ styles.button }
                            onPress={ this._onPress.bind(this)}>
                        创建
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
        height: 240,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 30 * 2
    },
    info: {
        color: 'rgba(0,0,0,0.7)'
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
    }
});


export const LayoutComponent = CreateWallet;

export function mapStateToProps(state) {
    return {
        wallet: state.wallet,
        UI: state.walletUI
    }
}
