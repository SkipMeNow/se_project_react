import avatar from "../../assets/Avatar.svg";
import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <img 
        src={avatar} 
        alt="Terrence Tegegne" 
        className={styles.sidebar__avatar}
      />
      <p className={styles.sidebar__username}>Terrence Tegegne</p>
    </div>
  );
}