// Importamos os eventos mockados
import { EVENTS } from "./data/mockEvents";
import { useCartStore } from "./store/useCartStore";
import { EventCard } from "./components/EventCard";

function App() {
  // Puxamos as ações e estado da nossa Store
  const { items, toggleCart, isOpen, removeFromCart, totalPrice } =
    useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ color: "var(--color-primary)" }}>EventCart 🎟️</h1>
        <button
          onClick={toggleCart}
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-primary)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          🛒 Carrinho ({totalItems})
        </button>
      </header>

      {/* GRID DE EVENTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          gridTemplateRows: "200px auto auto 1fr auto",
        }}
      >
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* DRAWER / CARRINHO LATERAL (Bem simples por enquanto) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100%",
            background: "#1e293b",
            boxShadow: "-5px 0 15px rgba(0,0,0,0.5)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2>Seu Carrinho</h2>
            <button
              onClick={toggleCart}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {items.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center" }}>
                Seu carrinho está vazio.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#0f172a",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                      {item.title}
                    </p>
                    <p
                      style={{ margin: 0, fontSize: "14px", color: "#94a3b8" }}
                    >
                      {item.quantity}x{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "transparent",
                      border: "1px solid #ef4444",
                      color: "#ef4444",
                      borderRadius: "4px",
                      padding: "5px 10px",
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalPrice())}
              </span>
            </div>
            <button
              style={{
                width: "100%",
                background: "#22c55e",
                border: "none",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
