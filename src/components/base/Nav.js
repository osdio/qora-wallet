import React, {
    View,
    Component,
    Proptypes,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const navHeight = statusBarHeight + 45;
const iconSize = 24;


class Nav extends Component {
    _renderItem(item) {
        if (this.props.renderRightItem && item === 'right') {
            return this.props.renderRightItem();
        }

        if (this.props.renderLeftItem && item === 'left') {
            return this.props.renderLeftItem();
        }


        if (this.props.back && item === 'left') {
            return (
                <TouchableOpacity onPress={()=>{
                    this.props.router.pop();
                }}>
                    <Icon name='ios-arrow-back' size={iconSize} style={[styles.icon, styles[`${item}Icon`]]}/>
                </TouchableOpacity>
            )
        }


        if (this.props[`${item}Icon`]) {
            return (
                <TouchableOpacity onPress={ this.props[`${item}Press`] }>
                    <Icon name={this.props[`${item}Icon`]} size={iconSize}
                          style={[styles.icon, styles[`${item}Icon`]]}/>
                </TouchableOpacity>
            )
        }


        if (this.props[item]) {
            return (
                <TouchableOpacity onPress={ this.props[`${item}Press`] }>
                    <Text style={[styles.itemText, styles[`${item}Text`]]}>
                        { this.props[item] }
                    </Text>
                </TouchableOpacity>
            )
        }
        return null;
    }


    _renderNav() {
        return ['left', 'center', 'right'].map(item=> {
            return (
                <View key={ item } style={[styles.item]}>
                    <View style={[styles.itemInner, styles[`${item}Inner`]]}>
                        { this._renderItem(item) }
                    </View>
                </View>
            )
        });
    }


    render() {
        return (
            <View style={ styles.container }>
                { this._renderNav() }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: navHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4845aa',
        width,
        paddingTop: statusBarHeight
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: navHeight - statusBarHeight,
        justifyContent: 'center'
    },
    itemInner: {
        flex: 1
    },
    leftInner: {
        paddingLeft: 15
    },
    rightInner: {
        paddingRight: 15
    },
    itemText: {
        color: 'white',
        fontSize: 18
    },
    centerText: {
        textAlign: 'center'
    },
    leftText: {
        textAlign: 'left'
    },
    rightText: {
        textAlign: 'right'
    },
    icon: {
        color: 'white'
    }
});


export default Nav;

