import { customFetch } from "./api";

export const authUser = (login, password) => customFetch('/auth', {
    method:'POST',
    body:JSON.stringify({login, password})
    })