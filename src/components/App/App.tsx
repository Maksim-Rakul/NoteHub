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
import SideBar from "../SideBar/SideBar";
import type { Note } from "../../types/note";
// import Modal from "../Modal/Modal";

const App = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setTag] = useState<string | null>("All");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["notes", page, searchValue, selectedTag],
    queryFn: () => fetchNotes(page, searchValue, selectedTag),
    placeholderData: keepPreviousData,
  });

  const handleChangeTag = (tagType: string | null) => {
    setTag(tagType);
  };

  const handleEditNote = (note: Note) => {
    setIsModalOpen(true);
    setEditingNote(note);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditingNote(null);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearchValue} />
        {isSuccess && data.notes.length > 0 && (
          <Pagination onChange={setPage} page={data?.totalPages} />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <Loading />}
        {error && <Error message={error.message} />}

        <div className={css.mainWrap}>
          <SideBar active={selectedTag} onClick={handleChangeTag} />

          {data?.notes && (
            <NoteList notes={data?.notes} onEdit={handleEditNote} />
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onClose={() => setIsModalOpen(false)}
              editNote={editingNote}
              clearForm={() => setEditingNote(null)}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default App;
