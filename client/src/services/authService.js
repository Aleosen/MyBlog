import { customFetch } from "./api";

export const authUser = (login, password) => customFetch('/login', {
    method:'POST',
    body:JSON.stringify({login, password})
    })

export const logoutUser = ()=> customFetch('/logout', {
    method:'POST'
})

export const getUser = () => customFetch('/me')