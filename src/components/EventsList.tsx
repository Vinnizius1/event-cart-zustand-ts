/**
 * EventsList - Lista de Eventos (Presentational Component)
 *
 * RESPONSABILIDADES:
 * - Renderizar grade de eventos
 * - Renderizar EventCard para cada evento
 *
 * NÃO FAZ:
 * - Controlar dados dos eventos (vem por props)
 * - Gerenciar estado do carrinho (deixa para EventCard)
 */

import { EventCard } from "./EventCard";
import type { Event } from "../types";
import styles from "../App.module.css";

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  return (
    <main className={styles.eventsGrid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </main>
  );
}
