import styles from "./ItemCard.module.css";

export default function ItemCard({ card, onCardClick }) {
  const handleClick = () => onCardClick(card);

  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardName}>{card.name}</h2>
      </div>
      <img
        src={card.imageUrl}
        alt={card.name}
        className={styles.cardImage}
        onClick={handleClick}
      />
    </li>
  );
}
