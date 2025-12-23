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
        display: "grid",
        gridTemplateRows: "subgrid",
        gridRow: "span 5",
        background: "var(--color-card)",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Row 1: Image */}
      <img
        src={event.image}
        alt={event.title}
        style={{
          gridRow: "1",
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes("fallback-concert.webp")) return;
          target.src = "/fallback-concert.webp";
          setHasImageError(true);
        }}
      />

      {/* Row 2: Title & Error Message */}
      <div style={{ gridRow: "2", padding: "20px 20px 0 20px" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>{event.title}</h3>
        {hasImageError && (
          <p
            style={{
              color: "#f97316",
              fontSize: "12px",
            }}
          >
            Imagem oficial indisponível. Exibindo visual padrão do evento.
          </p>
        )}
      </div>

      {/* Row 3: Details */}
      <div style={{ gridRow: "3", padding: "0 20px" }}>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 5px 0" }}>
          📅 {event.date}
        </p>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
          📍 {event.location}
        </p>
      </div>

      {/* Row 4 is the flexible spacer (1fr) */}

      {/* Row 5: Footer */}
      <div
        style={{
          gridRow: "5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderTop: "1px solid var(--color-border)",
          marginTop: "auto",
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
  );
}
