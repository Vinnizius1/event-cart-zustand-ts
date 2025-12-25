// --- Core Dependencies & Style ---
import styles from "./App.module.css";

// --- Components ---
import { EventsList } from "./components/EventsList";
import { CartDrawer } from "./components/CartDrawer";

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
    <div className={styles.appContainer}>
      {/* --- HEADER: Título e Botão do Carrinho --- */}
      <header className={styles.header}>
        <h1>EventCart 🎟️</h1>
        <button onClick={cart.toggleCart} className={styles.cartButton}>
          🛒 Carrinho ({cart.getTotalItems()})
        </button>
      </header>

      {/* --- MAIN: Lista de Eventos --- */}
      {/* Componente especializado em renderizar eventos */}
      <EventsList events={EVENTS} />

      {/* --- DRAWER: Carrinho de Compras --- */}
      {/* Componente especializado em renderizar o carrinho */}
      <CartDrawer
        isOpen={cart.isCartOpen}
        items={cart.items}
        totalPrice={cart.getTotalPrice()}
        onClose={cart.toggleCart}
        onRemoveItem={cart.removeItem}
      />
    </div>
  );
}

export default App;
