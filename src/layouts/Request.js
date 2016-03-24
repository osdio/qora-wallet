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
import QRCode from 'react-native-qrcode';


const {height, width} = Dimensions.get('window');


class Request extends Component {
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


                    <QRCode
                        value={this.props.balance}
                        size={200}
                        bgColor='purple'
                        fgColor='white'/>
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
        height: 40 * 4 + 70,
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


export const LayoutComponent = Request;
export function mapStateToProps(state) {
    return {
        transactionUI: state.transactionUI,
        balance: parseFloat(state.account.balance)
    };
}


