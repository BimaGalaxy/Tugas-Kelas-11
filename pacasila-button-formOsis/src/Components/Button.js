// src/Components/Button.js
import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
class CustomButton extends Component {
    handleClick = (message) => {
        alert(message);
    };
    render() {
        const buttonStyle = {
            width: this.props.width,
            height: this.props.height,
        };

        return (
            <Button
                variant={this.props.variant}
                style={buttonStyle}
                onClick={() => this.handleClick(`Tombol ${this.props.variant} diklik!`)}
            >
                {this.props.children}
            </Button>
        );
    };
}

export default CustomButton;
