import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NotesListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NotesListProps) => {
  const queryClient = useQueryClient();

  const noteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (noteId: string) => {
    noteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDeleteClick={handleDelete} />
      ))}
    </ul>
  );
};

export default NoteList;
