import axios from "axios"

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const AuthService = {
    login: (email, password) => {
        return axios.post('http://localhost:4000/auth/login', {
            email,
            password
        }).then(response => {
            console.log(response)
            const data = parseJwt(response.data.accessToken)
            return data
        })
    }
}

export default AuthService;