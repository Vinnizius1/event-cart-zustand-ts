// Importamos os eventos mockados
import { EVENTS } from "./data/mockEvents";
import { useCartStore } from "./store/useCartStore";
import { EventCard } from "./components/EventCard";
import styles from "./App.module.css"; // Importa o CSS Module

function App() {
  // Puxamos as ações e estado da nossa Store
  const { items, toggleCart, isOpen, removeFromCart, totalPrice } =
    useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.appContainer}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>EventCart 🎟️</h1>
        <button onClick={toggleCart} className={styles.cartButton}>
          🛒 Carrinho ({totalItems})
        </button>
      </header>

      {/* GRID DE EVENTOS */}
      <div className={styles.eventsGrid}>
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* DRAWER / CARRINHO LATERAL */}
      {isOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <h2>Seu Carrinho</h2>
            <button onClick={toggleCart} className={styles.closeButton}>
              ✕
            </button>
          </div>

          <div className={styles.cartItemsList}>
            {items.length === 0 ? (
              <p className={styles.emptyCartMessage}>
                Seu carrinho está vazio.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <p className={styles.cartItemTitle}>{item.title}</p>
                    <p className={styles.cartItemInfo}>
                      {item.quantity}x{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeItemButton}
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>

          <div className={styles.drawerFooter}>
            <div className={styles.totalSection}>
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalPrice())}
              </span>
            </div>
            <button className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
