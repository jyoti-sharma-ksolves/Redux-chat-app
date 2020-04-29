const initialState = {
    userData: {},
    message: ''
  };
  
const textChangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TEXT":
            return action.payload;
        
        default:
            return state;    
    }
};

export default textChangeReducer;