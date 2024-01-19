// src/Components/Button.js
import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
class CustomButton extends Component {
    render() {

        const buttonStyle = {
            width: this.props.width,
            height: this.props.height,
        };

        return (
            <Button variant={this.props.variant} style={buttonStyle}>
                {this.props.children}
            </Button>
        );
    };
}

export default CustomButton;
