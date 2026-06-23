import axios from "axios";

const token = import.meta.env.VITE_API_TOKEN

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {'Authorization': `Bearer ${token}`}    
})

export const fetchNotes = async () => {
    const res = await api.get('/notes?page=1&perPage=12')
    
    return res.data
}

export const createNote = () => {
  
}

export const deleteNote = () => {
  
}

