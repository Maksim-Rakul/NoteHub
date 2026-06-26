import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
}

const NoteList = ({ notes, onEdit }: NotesListProps) => {
  const queryClient = useQueryClient();

  const noteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (noteId: string) => {
    noteMutation.mutate(noteId);
  };

  if (notes.length > 0) {
    return (
      <ul className={css.list}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDeleteClick={handleDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    );
  } else {
    return <p>Not found</p>;
  }
};

export default NoteList;
