import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { Note, PatchNote, PostNote, Tag } from "../../types/note";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, patchNote } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
  editNote: Note | null;
  clearForm: () => void;
}

interface InitialValuesProps {
  title: string;
  content: string;
  tag: Tag;
}

const initialValues: InitialValuesProps = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required(),
});

const NoteForm = ({ onClose, editNote }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const initVal = editNote || initialValues;

  const form = useMutation({
    mutationFn: (newNote: PostNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const edit = useMutation({
    mutationFn: (patchedNote: PatchNote) => patchNote(patchedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (
    values: InitialValuesProps,
    actions: FormikHelpers<InitialValuesProps>,
  ) => {
    if (editNote) {
      edit.mutate({ id: editNote.id, ...values });
    } else {
      form.mutate(values);
    }
    onClose();
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initVal}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {editNote ? "Patch note" : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
