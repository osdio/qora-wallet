import React, {
    Component,
    PropTypes,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const iconNameMap = {
    'Account': 'person',
    'Block': 'ios-pulse-strong',
    'Setting': 'ios-gear'
};


class TabIcon extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        title: PropTypes.string
    };


    static defaultProps = {
        selectedStyle: {
            color: '#4845aa'
        },
        style: {
            color: 'black'
        }
    };


    render() {
        return (
            <Icon size={26} name={iconNameMap[this.props.title]} style={ this.props.selected ? this.props.selectedStyle : this.props.style }/>
        );
    }
}


export default TabIcon;
