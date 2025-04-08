import { customFetch } from "./api";

export const register = (username, email, password) => 
    customFetch('/register', {
        method:'POST',
        body:JSON.stringify({username, email, password})
        })