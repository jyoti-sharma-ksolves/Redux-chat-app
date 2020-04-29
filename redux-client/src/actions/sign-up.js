export const textChange = (field, text) => {
    return {
        type: 'CHANGE_TEXT',
        payload: {
            field: field,
            text: text
        }
    };
}

