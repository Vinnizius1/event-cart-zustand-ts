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
 * App - Componente Orquestrador (Container Component)
 *
 * RESPONSABILIDADES:
 * - Renderizar layout principal (header, main, aside)
 * - Orquestrar componentes filhos
 * - Gerenciar estado através do Facade
 *
 * NÃO FAZ:
 * - Cálculos complexos
 * - Formatação de dados
 * - Lógica de negócio específica
 *
 * PADRÕES APLICADOS:
 * - Container/Presentational Pattern
 * - Facade Pattern (CartFacade abstrai complexidade)
 * - Separation of Concerns
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
