import axios from "axios";
import type { Note, PostNote } from "../types/note";

interface NotesHTTPResponse {
    notes: Note[];
    totalPages: number;
}

const token = import.meta.env.VITE_API_TOKEN

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {'Authorization': `Bearer ${token}`}    
})

export const fetchNotes = async (page: number, search?: string) => {
    const res = await api.get<NotesHTTPResponse>('/notes', {
        params: {
            page,
            search
        }
    })

    return res.data
}

export const createNote = async (noteObj: PostNote) => {
    await api.post(`/notes`, noteObj)
}

export const deleteNote = async (noteId: string) => {
    await api.delete(`/notes/${noteId}`)
}

