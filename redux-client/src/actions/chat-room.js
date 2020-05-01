import { successMessage, failurMessage } from './common-actions';
import moment from 'moment';

const updateLoginUser = (data) => {
    return {
        type: 'LOGIN_USER_INFO',
        payload: {
            data: data,
        }
    };
}

const updateUserList = (data) => {
    return {
        type: 'USER_LIST',
        payload: {
            data: data,
        }
    };
}

const updateMessage = (data) => {
    return {
        type: 'GET_MESSAGE',
        payload: {
            data: data,
        }
    };
}

const updateSender = (data) => {
    return {
        type: 'GET_SENDER',
        payload: {
            data: data,
        }
    };
}

const updateReceiver = (data) => {
    return {
        type: 'GET_RECEIVER',
        payload: {
            data: data,
        }
    };
}

// export const sendMessage = (data) => {
//     return {
//         type: '',
//         payload: {
//             data: data,
//         }
//     };
// }

const getUserInfo = (id) => {
    return (dispatch) => {
        const url = `http://localhost:8000/api/user-info?id=${id}`; //temporary
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'User not exist') {
                return dispatch(successMessage(jsonData.message));
            }
            else if (jsonData.message === 'Success') {
                return dispatch(updateLoginUser(jsonData.data));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}

const getUserList = (id) => {
    return (dispatch) => {
        const url = `http://localhost:8000/api/user-list?id=${id}`;
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Success') {
                return dispatch(updateUserList(jsonData.data));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}

const getMessage = (id1, id2) => {
    console.log(id1, id2, '===')
    return (dispatch) => {
        const url = `http://localhost:8000/api/receive-message?sender_id=${id1}&receiver_id=${id2}`;
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Success') {
                return dispatch(updateMessage(jsonData.data));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Please try again!'));
        }) 
    }
}

const sendMessage = (id1,id2, text, time) => {
    return (dispatch) => {
        const url = 'http://localhost:8000/api/send-message';
        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                sender_id: id1,
                receiver_id: id2,
                message: text,
                created_at: time //moment.js(new Date()).format()
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return dispatch(failurMessage('Message not sent'));
            }
            else if (jsonData.message === 'Success') {
                return dispatch(successMessage(jsonData.message));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(failurMessage('Message not sent'));
        }) 
    }
}

// const callGetMessage = (id1, id2) => {
//     console.log(id1, id2, '++++')
//   return (dispatch) => {
//       setTimeout(() => {
//         return dispatch(getMessage(id1, id2))
//       }, 500)
//   }
// }

export {
    getUserInfo,
    getUserList,
    getMessage,
    sendMessage,
    updateSender,
    updateReceiver,
    updateMessage
    // callGetMessage
}
