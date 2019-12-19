import {State, Action} from '../appTypes'

// Actions
const USERNAME: string = 'USERNAME';


// Reducer
const initialState: State = {
    userName: '',
};

export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case USERNAME:
            return {...state, userName: action.payload};
        default:
            return state;
    }
}


// Action Creators
export function getUserName (userName: string): Action {
    return {
        type: USERNAME,
        payload: userName,
    };
}
