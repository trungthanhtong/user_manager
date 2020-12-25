import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import UsersList from './UsersList'

export default class UserManager extends Component {
    render() {
        return (
            <div className="container">
                <RegistrationForm/>
                <UsersList/>
            </div>
        )
    }
}
