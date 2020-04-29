import React from 'react';
import { connect } from 'react-redux';
import { textChange } from '../actions/sign-up';

class SignUp extends React.Component {
    constructor (props) {
        super(props)
    }

    handleChange = (e) => {
      this.props.dispatch(textChange(e.target.name, e.target.value))

    }

    render () {
        return (
            <div className="loginBox">
                  <h1>Sign Up</h1>
                  <input type="text" name="firstName" onChange={this.handleChange} value=""/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state, '=======')
    // return state;
}

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch, '+++++++++')
    // return dispatch;
}

export default connect()(SignUp);