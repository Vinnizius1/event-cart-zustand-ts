// --- Core Dependencies & Style ---
import styles from "./App.module.css"; // CSS Modules for component-scoped styling.

// --- Components & Data ---
import { EventCard } from "./components/EventCard";
import { EVENTS } from "./data/mockEvents"; // Static data source for events.

// --- State Management ---
import { useCartStore } from "./store/useCartStore"; // Zustand store hook for global state.

// Currency formatter for Brazilian Real
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

/**
 * App is the root component, responsible for the main layout and orchestrating
 * the primary user interactions with the event list and shopping cart.
 */
function App() {
  // Destructure actions and state from our global store.
  // This hook ensures the component re-renders only when these specific values change.
  const { items, toggleCart, isOpen, removeFromCart, totalPrice } =
    useCartStore();

  // Derived state: Calculated on every render.
  // Cheaper than storing in state, as it doesn't trigger extra re-renders.
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.appContainer}>
      {/* --- HEADER --- */}
      <header className={styles.header}>
        <h1>EventCart 🎟️</h1>
        <button onClick={toggleCart} className={styles.cartButton}>
          🛒 Carrinho ({totalItems})
        </button>
      </header>

      {/* --- EVENT LIST --- */}
      {/* Renders a grid of events by mapping over our static data. */}
      <main className={styles.eventsGrid}>
        {EVENTS.map((event) => (
          // `key` is crucial for React's reconciliation algorithm to efficiently update the list.
          <EventCard key={event.id} event={event} />
        ))}
      </main>

      {/* --- SHOPPING CART DRAWER --- */}
      {/* Conditional rendering: The drawer is only in the DOM when `isOpen` is true. */}
      {isOpen && (
        <aside className={styles.drawer}>
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
                      {/* Use Intl API for robust, locale-aware currency formatting. */}
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  {/* We use an arrow function in onClick to defer execution and pass the item.id. */}
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

          {/* --- CART FOOTER & CHECKOUT --- */}
          <div className={styles.drawerFooter}>
            <div className={styles.totalSection}>
              <span>Total:</span>
              <span>
                {formatCurrency(totalPrice())}
              </span>
            </div>
            <button className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;
