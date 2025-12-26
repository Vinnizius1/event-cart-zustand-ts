import { useState } from "react";
import type { Event } from "../types";
import { useCartFacade } from "../facade/CartFacade";
import { CurrencyService } from "../services/CurrencyService";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const { addItem } = useCartFacade();

  return (
    <div className={styles.card}>
      <img
        src={event.image}
        alt={event.title}
        className={styles.cardImage}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes("fallback-concert.webp")) return;
          target.src = "/fallback-concert.webp";
          setHasImageError(true);
        }}
      />

      <div className={styles.titleSection}>
        <h3>{event.title}</h3>
        {hasImageError && (
          <p className={styles.errorText}>
            Imagem oficial indisponível. Exibindo visual padrão do evento.
          </p>
        )}
      </div>

      <div className={styles.detailsSection}>
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
      </div>

      {/* A linha 4 do grid é o espaço flexível que empurra o footer */}

      <div className={styles.footer}>
        <span className={styles.price}>
          {CurrencyService.format(event.price)}
        </span>
        <button onClick={() => addItem(event)} className={styles.buyButton}>
          Comprar
        </button>
      </div>
    </div>
  );
}
