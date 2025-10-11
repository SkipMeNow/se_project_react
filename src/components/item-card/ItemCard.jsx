import styles from "./ItemCard.module.css";

export default function ItemCard({ item, onCardClick }) {
  const handleClick = () => onCardClick(item);

  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardName}>{item.name}</h2>
      </div>
      <img
        src={item.link}
        alt={item.name}
        className={styles.cardImage}
        onClick={handleClick}
      />
    </li>
  );
}
