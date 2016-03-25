import React, {
    Component,
    PropTypes,
    View,
    Text,
    StyleSheet,
    ListView,
    Dimensions
} from 'react-native';
import Nav from '../components/base/Nav';


const {height, width} = Dimensions.get('window');


class Name extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: ds.cloneWithRows(props.nameList)
        }
    }

    componentDidMount() {
        const {actions, address} = this.props;
        actions.getNameListByAddress(address);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.nameList !== this.props.nameList) {
            this.setState({
                data: this.state.data.cloneWithRows(nextProps.nameList)
            });
        }
    }


    _renderRow(item, sectionId, rowId) {
        return (
            <View style={styles.itemWrapper}>
                <Text>
                    {parseInt(rowId) + 1 }
                </Text>
                <Text>
                    {item}
                </Text>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Nav center="Name Service" rightIcon="plus-round"
                     back={true}
                     rightPress={()=> this.props.router.toRegisterName({back:true})}
                    {...this.props}
                />
                <View style={styles.header}>
                    <Text>
                        总计:
                    </Text>
                    <Text>
                        {this.props.nameList.length}
                    </Text>
                </View>
                <ListView dataSource={this.state.data}
                          renderRow={this._renderRow.bind(this)}>

                </ListView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 41,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.09)',
        paddingRight: 20,
        paddingLeft: 20
    },
    itemWrapper: {
        height: 40 + 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'space-between'
    }
});


export const LayoutComponent = Name;
export function mapStateToProps(state) {
    return {
        address: state.account.address,
        nameList: state.account.nameList
    };
}
