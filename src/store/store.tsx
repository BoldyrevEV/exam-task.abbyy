// Actions
const USERNAME: string = 'USERNAME';


// Reducer
const initialState = {
    userName: '',
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case USERNAME:
            return {...state, userName: action.payload};
        default:
            return state;
    }
}


// Action Creators
export function getUserName (userName: string): {} {
    return {
        type: USERNAME,
        payload: userName,
    };
}
