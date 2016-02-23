import React, {
    Component,
    PropTypes,
    Text
} from 'react-native';


class TabIcon extends Component {
    static propTypes = {
        selectedStyle: PropTypes.object,
        style: PropTypes.object,
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
            <Text style={ this.props.selected ? this.props.selectedStyle : this.props.style }>{this.props.title}</Text>
        );
    }
}


export default TabIcon;
