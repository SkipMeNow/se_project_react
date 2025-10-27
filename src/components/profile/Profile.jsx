import SideBar from "../sidebar/SideBar";
import ClothesSection from "../clothes-section/ClothesSection";
import styles from "./Profile.module.css";

export default function Profile({ clothingItems, onCardClick, onAddItemClick }) {
  return (
    <div className={styles.profile}>
      <section className={styles.profile__sidebar}>
        <SideBar />
      </section>
      <section className={styles.profile__clothes}>
        <ClothesSection 
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddItemClick={onAddItemClick}
        />
      </section>
    </div>
  );
}