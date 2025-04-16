import { customFetch } from "./api";

export const authUser = (login, password, rememberMe) => customFetch('/login', {
    method:'POST',
    body:JSON.stringify({login, password, rememberMe})
    })

export const logoutUser = ()=> customFetch('/logout', {
    method:'POST'
})

export const getUser = () => customFetch('/me')