import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Spinner from '../components/base/Spinner';


const {height, width} = Dimensions.get('window');


class Account extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const {actions, account} = this.props;
        actions.getWalletFormStorage({
            resolved: ()=> {
                actions.getAccountFromStorage(({address})=> {
                    actions.getBalance(address);
                    actions.getUnconfirmedTransactionList(address);
                });
            },
            rejected: ()=> {
                this.props.router.toCreateWallet();
            }
        });
        actions.getTransactionFromStorage();
    }


    _renderBlockInfo(lastBlock) {
        if (lastBlock.height) {
            return (
                <View key="blockInfo" style={styles.blockInfo}>
                    <Text key="last-block" style={styles.blockInfoText}>
                        Last Block:
                    </Text>
                    <Text key="height" style={styles.blockInfoText}>
                        {lastBlock.height}
                    </Text>
                    <Text key="block-info" style={styles.blockInfoText}>
                        {
                            lastBlock.timestamp && moment(new Date(lastBlock.timestamp)).startOf('second').fromNow()
                        }
                    </Text>
                </View>
            )
        }
        return (
            <View key="blockInfo" style={styles.blockInfo}>
                <Spinner/>
            </View>
        )
    }


    _onRefresh() {
        this.props.actions.update('pullRefresh');
    }


    render() {
        const {lastBlock={}, balance={}} = this.props.account;

        return (
            <ScrollView style={styles.container}
                        refreshControl={
                              <RefreshControl
                                refreshing={this.props.accountUI.pullRefreshPending}
                                onRefresh={this._onRefresh.bind(this)}
                                tintColor="#4845aa"
                                title="Loading..."
                                colors={['#4845aa']}
                                progressBackgroundColor="#ffff00"
                              />
                            }
            >

                { this._renderBlockInfo(lastBlock) }

                <View key="wall" style={styles.wall}>
                    <View style={styles.wallItem}>
                        <TouchableOpacity onPress={()=> this.props.router.toSend({back:true})}>
                            <View>
                                <Icon name="ios-paperplane" size={45} style={styles.wallItemText}/>
                                <Text style={styles.wallItemText}>
                                    打款
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.wallItem}>
                        <Icon name="ios-circle-filled" size={45} style={styles.wallItemText}/>
                        <Text onPress={()=>{
                            this.props.actions.openUnlock();
                        }}
                              style={styles.wallItemText}>
                            余额
                        </Text>
                    </View>

                    <View style={styles.wallItem}>
                        <TouchableOpacity onPress={()=> this.props.router.toRequest({
                            back:true
                        })}>
                            <Icon name="arrow-swap" size={45} style={styles.wallItemText}/>
                            <Text style={styles.wallItemText}>
                                收款
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View key="sub-wall" style={styles.subWall}>
                    <Text style={styles.balance}>
                        { parseFloat(balance) }
                    </Text>
                </View>

                <View key="sub-header" style={styles.subHeader}>
                    <Text style={styles.subHeaderText}>
                        Service
                    </Text>
                </View>


                <View key="box-wrapper" style={styles.boxWrapper}>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={()=> this.props.router.toName({
                            back:true,
                            showNav: false
                        })}>
                            <View style={styles.box}>
                                <Icon size={40} name="ios-world"/>
                                <Text style={styles.boxText}>
                                    Name Service
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <Icon size={40} name="ios-world"/>
                        <Text style={styles.boxText}>
                            Blog Service
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <Icon size={40} name="ios-world"/>
                        <Text style={styles.boxText}>
                            Block Explore
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <Icon size={40} name="ios-world"/>
                        <Text style={styles.boxText}>
                            Message Service
                        </Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 50
    },
    wall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ECF0F1',
        paddingTop: 20,
        paddingBottom: 10
    },
    wallItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    wallItemText: {
        color: 'rgba(0,0,0,0.6)'
    },
    subWall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ECF0F1',
        paddingBottom: 10
    },
    balance: {
        color: '#3498DB',
        fontSize: 14
    },
    blockInfo: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 30,
        borderBottomColor: 'rgba(0,0,0,0.03)',
        borderBottomWidth: 1
    },
    blockInfoText: {
        fontSize: 13
    },
    subHeader: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        borderBottomColor: '#4845aa',
        borderBottomWidth: 3
    },
    subHeaderText: {
        color: '#34495E'
    },
    boxWrapper: {
        height,
        width,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        width: width / 3,
        height: width / 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export function mapStateToProps(state) {
    return {
        wallet: state.wallet,
        walletUI: state.walletUI,
        account: state.account,
        accountUI: state.accountUI
    };
}

export const LayoutComponent = Account;
