import {customFetch} from './api'

export const getProfile = (id) => customFetch(`/profile/${id}`)
export const getUserPosts = (id) => customFetch(`/profile/${id}/posts`)