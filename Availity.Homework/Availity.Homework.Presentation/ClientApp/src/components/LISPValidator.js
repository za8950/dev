import React, { Component } from 'react';

export class LISPValidator extends Component {
    displayName = LISPValidator.name

    constructor(props) {
        super(props);
        this.state = { isValid: "No" };
        this.open = 0;
        this.closed = 0;
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        this.parseCode(event.target.code.value)
    }

    parseCode(code) {

        for (let letter of code) {
            //console.log(letter);
            if (letter === ')') {
                this.open++;
            } else if (letter === '(') {
                this.closed++;
            }
        }

        if (this.open === this.closed && (this.open > 0 && this.closed > 0)) {

            this.open = 0;
            this.closed = 0;

            this.setState({
                isValid: "Yes"
            });
        } else {
            this.open = 0;
            this.closed = 0;

            this.setState({
                isValid: "No"
            });
        }
    }


    render() {
        return (
            <div>
                <h1>Validate LISP Code</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="code" ref={node => (this.inputNode = node)} placeholder="Enter LISP Code" />
                    <button type="submit">Validate</button>
                </form>
                <p>Is Valid?: <strong>{this.state.isValid}</strong></p>
            </div>
        );
    }
}