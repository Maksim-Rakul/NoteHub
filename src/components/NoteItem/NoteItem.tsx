import { useState } from "react";
import type { Note } from "../../types/note";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  onDeleteClick: (noteId: string) => void;
}

const NoteItem = ({ note, onDeleteClick }: NoteItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (noteId: string) => {
    setIsDeleting(true);
    onDeleteClick(noteId);
  };

  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <button
          className={css.button}
          onClick={() => handleDelete(note.id)}
          disabled={isDeleting}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
