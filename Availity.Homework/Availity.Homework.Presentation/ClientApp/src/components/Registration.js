import React, { Component } from 'react';

export class Registration extends Component {
    displayName = Registration.name

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            npiNumber: '',
            businessAddress: '',
            phone: '',
            email:''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.postRegistration(this.state)
    }

    postRegistration(form) {

        console.log(this.state.firstName);

        fetch('api/registration/provider/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                npiNumber: this.state.npiNumber,
                businessAddress: this.state.businessAddress,
                phone: this.state.phone,
                email: this.state.email
            })
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Provider Registration</h1>
                <form onSubmit={this.submitHandler}>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={this.state.firstName}
                            onChange={this.handleInputChange} />
                    </label><br />
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={this.state.lastName}
                                onChange={this.handleInputChange} />
                    </label><br />
                    <label>
                        NPI Number:
                         <input type="text" name="npiNumber" value={this.state.npiNumber}
                            onChange={this.handleInputChange} />
                    </label><br/>
                    <label>
                        Business Address:
                        <input type="text" name="businessAddress" value={this.state.businessAddress}
                            onChange={this.handleInputChange} />

                    </label><br/>
                    <label>
                        Phone: 
                        <input type="text" name="phone" value={this.state.phone}
                            onChange={this.handleInputChange} />
                    </label><br/>
                    <label>
                        Email: 
                        <input type="text" name="email" value={this.state.email}
                            onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}