// --- Core Dependencies & Style ---
import styles from "./App.module.css";

// --- Components ---
import { EventsList } from "./components/events";
import { CartDrawer } from "./components/cart";
import { ErrorBoundary } from "./components/ErrorBoundary";

// --- Data ---
import { EVENTS } from "./data/mockEvents";

// --- Facade & Services ---
import { useCartFacade } from "./facade/CartFacade";

/**
 * Componente Orquestrador Principal (Container Component).
 *
 * @component
 * @description Responsável por definir o layout estrutural da aplicação e mediar a comunicação
 * entre o estado global (via CartFacade) e os componentes de visualização.
 *
 * **Responsabilidades:**
 * - Renderizar o shell da aplicação (header, main, aside).
 * - Injetar dados e callbacks nos componentes `EventsList` e `CartDrawer`.
 *
 * **Padrões Aplicados:**
 * - Facade Pattern: Para isolar a lógica da Store (Zustand).
 * - Container/Presentational Pattern: Atuando como o "Smart Component".
 * - Error Boundary: Garantindo a resiliência da UI.
 */
function App() {
  // Uma única source of truth para lógica do carrinho
  const cart = useCartFacade();

  return (
    <ErrorBoundary
      fallback={
        <div className={styles.errorFullPage}>
          Erro crítico ao carregar o sistema.
        </div>
      }
    >
      <div className={styles.appContainer}>
        {/* --- HEADER --- */}
        <header className={styles.header}>
          <h1>EventCart 🎟️</h1>
          <button onClick={cart.toggleCart} className={styles.cartButton}>
            🛒 Carrinho ({cart.getTotalItems()})
          </button>
        </header>

        {/* --- MAIN --- */}
        <main>
          <ErrorBoundary fallback={<p>Erro ao carregar a lista de eventos.</p>}>
            <EventsList events={EVENTS || []} />
          </ErrorBoundary>
        </main>

        {/* --- DRAWER --- */}
        <CartDrawer
          isOpen={cart.isCartOpen}
          items={cart.items}
          totalPrice={cart.getTotalPrice()}
          onClose={cart.toggleCart}
          onRemoveItem={cart.removeItem}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
