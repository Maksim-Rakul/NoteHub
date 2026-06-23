import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";

const NoteList = () => {
  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      <NoteItem />
    </ul>
  );
};

export default NoteList;
