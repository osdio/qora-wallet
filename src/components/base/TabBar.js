import React,{
    Component,
    PropTypes,
    StyleSheet
} from 'react';


class TabBar extends Component {
    constructor(props) {
        super(props);
    }


    _renderTabBarItems() {
        return this.props.children.map((item)=> {
            return item;
        });
    }


    render() {
        return (
            <View style={styles.container}>
                { this._renderTabBarItems() }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alginItems: 'center',
        height: 45 + 1,
        borderTopColor: 'rgba(0,0,0,0.1)'
    }
});


export default TabBar;
