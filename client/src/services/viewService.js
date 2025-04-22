import { customFetch } from "./api"

export const addView = (id)=> customFetch(`/blogs/${id}/view`, {
    method:'POST',
})