import React, {
    View,
    PropTypes,
    Component,
    StyleSheet,
    Text,
    Dimensions,
    ListView
} from 'react-native';


class Block extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: ds.cloneWithRows(props.unconfirmedTransaction)
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.unconfirmedTransaction !== this.props.unconfirmedTransaction) {
            this.setState({
                data: this.state.data.cloneWithRows(nextProps.unconfirmedTransaction)
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
                    {item.amount}
                </Text>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <ListView
                    renderRow={this._renderRow.bind(this)}
                    dataSource={this.state.data}>

                </ListView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export function mapStateToProps(state) {
    return {
        ...state.transaction
    };
}

export const LayoutComponent = Block;
