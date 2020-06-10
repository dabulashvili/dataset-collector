import baseUrl from './base-url';

import { handleResponse } from '../helpers/handle-response';
import qs from '../helpers/querystring'

function list(token, page, limit) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const query = qs({
        page,
        limit
    })
    return fetch(`${baseUrl}sentence/list${query}`, requestOptions)
        .then(handleResponse)
}

function getById(token, id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    return fetch(`${baseUrl}sentence/${id}`, requestOptions)
        .then(handleResponse)
}

function next(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    return fetch(`${baseUrl}sentence/next`, requestOptions)
        .then(handleResponse)
}

export default {
    list,
    getById,
    next,
};