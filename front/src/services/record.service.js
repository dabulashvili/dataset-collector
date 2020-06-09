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
    return fetch(`${baseUrl}record/list${query}`, requestOptions)
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

    return fetch(`${baseUrl}record/${id}`, requestOptions)
        .then(handleResponse)
}

function save(token, sentence, audio) {
    const formData = new FormData();

    formData.append('sentence', sentence._id)
    formData.append('audio', audio)

    console.log(formData)
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    return fetch(`${baseUrl}record/save`, requestOptions)
        .then(handleResponse)
}

export default {
    list,
    getById,
    save,
};