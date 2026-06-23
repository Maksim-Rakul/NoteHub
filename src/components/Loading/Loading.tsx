import css from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <p className={css.loading}>Loading, please wait...</p>
    </div>
  );
};

export default Loading;
