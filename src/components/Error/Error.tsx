import css from "./Error.module.css";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div>
      <p className={css.error}>Error: {message}</p>
    </div>
  );
};

export default Error;
