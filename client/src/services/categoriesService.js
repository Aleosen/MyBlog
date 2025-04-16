import {customFetch} from './api'

export const getCategories = (term) => customFetch(`/categories?search=${term}`)