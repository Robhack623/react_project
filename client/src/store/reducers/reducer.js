
const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {

    if(action.type == 'ON_LOGIN') {
        return{
            ...state,
            isAuthenticated: action.payload == null ? false: true
        }
    } else if (action.type == 'ON_SIGNOUT') {
        return {
            ...state,
            isAuthenticated: false
        }
    }
    return state
}

export default reducer