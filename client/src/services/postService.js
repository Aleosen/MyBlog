import { customFetch } from "./api";

export const getPosts = (page,limit,filter, search) => {
    const filterString = encodeURIComponent(JSON.stringify(filter));
    return customFetch(`/blogs?page=${page}&limit=${limit}&filter=${filterString}&search=${search}`)
}

export const createPost = (data) => customFetch('/blogs', {
    method:'POST',
    body:JSON.stringify(data)
})

export const deletePost = (id) => customFetch(`/blogs/${id}`, {
    method: 'DELETE'
})

export const getPost = (id) => customFetch(`/blogs/${id}`)

export const updatePost = (id, newTitle, newContent, newMedia_url, categories) => 
    customFetch(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            title: newTitle, 
            content: newContent, 
            media_url: newMedia_url,
            categories: categories
        })
    });