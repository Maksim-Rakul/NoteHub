import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";

const App = () => {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination />
        <button className={css.button}>Create note +</button>
      </header>

      <NoteList />

      {/* <Modal /> */}
    </div>
  );
};

export default App;
