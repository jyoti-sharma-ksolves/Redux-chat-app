const initialState = {
    userData: {}
  };
  
const textChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TEXT":
            state.userData[action.payload.field] = action.payload.text;
            return {...state};
        
        default:
            return state;    
    }
};

export default textChangeReducer;