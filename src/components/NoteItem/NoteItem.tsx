import { useState } from "react";
import type { Note } from "../../types/note";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  onDeleteClick: (noteId: string) => void;
  onEdit: (note: Note) => void;
}

const NoteItem = ({ note, onDeleteClick, onEdit }: NoteItemProps) => {
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
        <div className={css.btnWrap}>
          <button
            className={` ${css.editBtn} ${css.button}`}
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className={css.button}
            onClick={() => handleDelete(note.id)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
