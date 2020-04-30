import { successMessage, failurMessage } from './common-actions';

export const submit = (userData) => {
    return (dispatch) => {
        const url = 'http://localhost:8000/api/sign-in';
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                email: userData.signInEmail,
                password: userData.signInPassword
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Login successful') {
                return dispatch(successMessage(jsonData.message));
            }
            else if (jsonData.message === 'Password incorrect') {
                // localStorage.setItem('document', JSON.stringify(jsonData.data))
                return dispatch(failurMessage(jsonData.message));
            }
            else if (jsonData.message === 'User not exist') {
                return dispatch(failurMessage(jsonData.message));
            }
            
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}
