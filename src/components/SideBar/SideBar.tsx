import css from "./SideBar.module.css";

interface SideBarProps {
  active: string | null;

  onClick: (tag: string) => void;
}

const SideBar = ({ active, onClick }: SideBarProps) => {
  return (
    <ul className={css.tagList}>
      <li>
        <button
          className={`${css.tag} ${active === "All" && css.active}`}
          onClick={() => onClick("All")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={`${css.tag} ${active === "Work" && css.active}`}
          onClick={() => onClick("Work")}
        >
          Work
        </button>
      </li>
      <li>
        <button
          className={`${css.tag} ${active === "Personal" && css.active}`}
          onClick={() => onClick("Personal")}
        >
          Personal
        </button>
      </li>
      <li>
        <button
          className={`${css.tag} ${active === "Meeting" && css.active}`}
          onClick={() => onClick("Meeting")}
        >
          Meeting
        </button>
      </li>
      <li>
        <button
          className={`${css.tag} ${active === "Shopping" && css.active}`}
          onClick={() => onClick("Shopping")}
        >
          Shopping
        </button>
      </li>
      <li>
        <button
          className={`${css.tag} ${active === "Todo" && css.active}`}
          onClick={() => onClick("Todo")}
        >
          Todo
        </button>
      </li>
    </ul>
  );
};

export default SideBar;
