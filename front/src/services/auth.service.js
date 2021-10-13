import baseUrl from './base-url'

import { handleResponse } from '../helpers/handle-response'

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }

    return fetch(`${baseUrl}auth/login`, requestOptions)
        .then(handleResponse)
}

export default {
    login,
    logout,
}