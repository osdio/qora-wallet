import React, {
    Component,
    PropTypes,
    Text
} from 'react-native';
import Btn from 'react-native-button';
import Spinner from './Spinner';


class Button extends Component {
    static propTypes = {
        pending: PropTypes.bool
    };



    _renderChildren() {
        if (this.props.pending) {
            return <Spinner/>
        }
        return this.props.children;

    }


    render() {
        return (
            <Btn { ...this.props }>
                { this._renderChildren() }
            </Btn>
        );
    }
}


export default Button;
