import ItemCard from "../item-card/ItemCard";
import styles from "./ClothesSection.module.css";

export default function ClothesSection({ clothingItems, onCardClick, onAddItemClick }) {
  return (
    <div className={styles.clothes}>
      <div className={styles.clothes__header}>
        <p className={styles.clothes__title}>Your items</p>
        <button 
          type="button" 
          className={styles.clothes__addButton}
          onClick={onAddItemClick}
        >
          + Add new
        </button>
      </div>
      <ul className={styles.clothes__list}>
        {clothingItems.map((item) => (
          <ItemCard 
            key={item.id} 
            card={item} 
            onCardClick={onCardClick} 
          />
        ))}
      </ul>
    </div>
  );
}