const textChange = (field, text) => {
    return {
        type: 'CHANGE_TEXT',
        payload: {
            field: field,
            text: text
        }
    };
}

const successMessage = (message) => {
    return {
        type: 'SUCCESS',
        payload: {
            type: 'success',
            message: message
        }
    };
}

const failurMessage = (message) => {
    return {
        type: 'ERROR',
        payload: {
            type: 'error',
            message: message
        }
    };
}

module.exports = {
    textChange,
    successMessage,
    failurMessage
}