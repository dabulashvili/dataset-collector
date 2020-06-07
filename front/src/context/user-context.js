import React, { createContext, useReducer, useCallback } from 'react';

import { AuthService } from '../services/auth.service'

const initialState = { user: JSON.parse(sessionStorage.getItem('user')) }

const UserContext = createContext(initialState);

let reducer = (state, action) => {
    switch (action.type) {
        case "login": {
            return { ...state, user: action.user }
        }
        case "logout": {
            sessionStorage.removeItem('user')
            return { ...state, user: undefined };
        }
        default:
            return;
    }
};


function UserProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const customDispatch = useCallback(async (action) => {
        switch (action.type) {
            case "login": {
                const user = await AuthService.login(action.email, action.password);
                sessionStorage.setItem('user', JSON.stringify(user))
                dispatch({
                    type: "login",
                    user
                });
                break;
            }
            default:
                // Not a special case, dispatch the action
                dispatch(action);
        }
    }, []); // The empty array causes this callback to only be created once per component instance

    return (
        <UserContext.Provider value={{ state, dispatch: customDispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };