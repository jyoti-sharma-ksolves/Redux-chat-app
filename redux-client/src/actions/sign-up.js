export const textChange = (field, text) => {
    return {
        type: 'CHANGE_TEXT',
        payload: {
            field: field,
            text: text
        }
    };
}

export const successMessage = (message) => {
    return {
        type: 'SUCCESS',
        payload: {
            type: 'success',
            message: message
        }
    };
}

export const failurMessage = (message) => {
    return {
        type: 'ERROR',
        payload: {
            type: 'error',
            message: message
        }
    };
}

export const submit = (userData) => {
    return (dispatch) => {
        const url = 'http://localhost:8000/api/sign-up';
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.email,
                password: userData.password
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Account created successfully') {
                return dispatch(successMessage(jsonData.message));
            }
            else if (jsonData.message === 'Email already in use') {
                return dispatch(failurMessage(jsonData.message));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}
