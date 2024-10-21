//copied from https://dev.to/spyke/making-api-calls-from-nodejs-3mfks

import axios from 'axios';

const http = axios.create({
    baseURL: 'https://example.com/api'
});

export function getUser(userId) {
    // An equivalent to `GET /users?id=12345`
    return http.get('/api/v1/users/:user_id/courses', {
        params: {
            id: 12345
        }
    });
}