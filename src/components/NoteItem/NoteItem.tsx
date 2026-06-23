import css from "./NoteItem.module.css";

const NoteItem = () => {
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>Note title</h2>
      <p className={css.content}>Note content</p>
      <div className={css.footer}>
        <span className={css.tag}>Note tag</span>
        <button className={css.button}>Delete</button>
      </div>
    </li>
  );
};

export default NoteItem;
