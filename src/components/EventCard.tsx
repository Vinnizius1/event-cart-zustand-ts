// src/components/EventCard.tsx
import { useState } from "react";
import type { Event } from "../types";
import { useCartStore } from "../store/useCartStore";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const { addToCart } = useCartStore();

  return (
    <div
      style={{
        background: "var(--color-card)",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
      }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes("fallback-concert.webp")) return;
          target.src = "/fallback-concert.webp";
          setHasImageError(true);
        }}
      />

      {hasImageError && (
        <p
          style={{
            color: "#f97316",
            fontSize: "12px",
            marginTop: "8px",
            padding: "0 20px",
          }}
        >
          Imagem oficial indisponível. Exibindo visual padrão do evento.
        </p>
      )}

      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>{event.title}</h3>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>📅 {event.date}</p>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
          📍 {event.location}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(event.price)}
          </span>
          <button
            onClick={() => addToCart(event)}
            style={{
              background: "var(--color-primary)",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
