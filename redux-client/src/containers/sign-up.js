import React from 'react';
import { connect } from 'react-redux';
import { textChange, submit } from '../actions/sign-up';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import AccountCreated from '../components/AccountCreatedPage';

class SignUp extends React.Component {
    constructor (props) {
        super(props)
    }

    handleChange = (e) => {
      this.props.dispatch(textChange(e.target.name, e.target.value))
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { userData } = this.props.textChangeReducer;
        this.props.dispatch(submit(userData));
    }

    render () {
        const { userData } = this.props.textChangeReducer;
        const { notifications } = this.props.notifications;

        return (
            <div className="loginBox">
                  {notifications.message === 'Account created successfully' ?
                    <AccountCreated /> : 
                    <React.Fragment>
                       <h1>Sign Up</h1>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                name="firstName"
                                label="first name"
                                variant="outlined"
                                value={userData.firstName}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                name="lastName"
                                label="last name"
                                variant="outlined"
                                value={userData.lastName}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                name="email"
                                type="email"
                                label="email"
                                variant="outlined"
                                value={userData.email}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="password"
                                variant="outlined"
                                value={userData.password}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <TextField
                                type="password"
                                name="pwconfirm"
                                label="confirm password"
                                variant="outlined"
                                value={userData.pwconfirm}
                                onChange={this.handleChange}
                                reqired="true"
                            />
                            <br />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                        {notifications.type &&
                            <div class="alert">
                            <Alert severity={notifications.type}>
                                    <AlertTitle>{notifications.type}</AlertTitle>
                                    {/* This is an error alert — <strong>check it out!</strong> */}
                                    {notifications.message}
                            </Alert>
                        </div>
                        }
                    </React.Fragment>
                  }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SignUp);