import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
// import Modal from "../Modal/Modal";

const App = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["notes", page, searchValue],
    queryFn: () => fetchNotes(page, searchValue),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearchValue} />
        {isSuccess && <Pagination onChange={setPage} page={data?.totalPages} />}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <Loading />}
        {error && <Error message={error.message} />}

        {data?.notes && <NoteList notes={data?.notes} />}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default App;
