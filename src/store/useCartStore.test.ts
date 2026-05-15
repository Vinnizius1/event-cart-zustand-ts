import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/useCartStore";
import type { Event } from "@/types";

// ─── MOCKS ───────────────────────────────────────────────────
const mockEvent: Event = {
  id: "evt-001",
  title: "Show do Coldplay",
  date: "15/10/2026",
  location: "São Paulo",
  image: "/coldplay.jpg",
  price: 350,
  availableQty: 100,
};

const mockEvent2: Event = {
  id: "evt-002",
  title: "Rock in Rio",
  date: "20/09/2026",
  location: "Rio de Janeiro",
  image: "/rir.jpg",
  price: 500,
  availableQty: 50,
};

// ─── TESTES ───────────────────────────────────────────────────
describe("useCartStore", () => {
  // Reseta o store antes de CADA teste
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  // ── Estado inicial ────────────────────────────────────────
  it("deve iniciar com carrinho vazio e fechado", () => {
    const { items, isOpen } = useCartStore.getState();
    expect(items).toHaveLength(0);
    expect(isOpen).toBe(false);
  });

  // ── toggleCart ────────────────────────────────────────────
  it("toggleCart deve abrir o carrinho quando fechado", () => {
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);
  });

  it("toggleCart deve fechar o carrinho quando aberto", () => {
    useCartStore.setState({ isOpen: true });
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(false);
  });

  // ── addToCart ─────────────────────────────────────────────
  it("addToCart deve adicionar novo evento ao carrinho", () => {
    useCartStore.getState().addToCart(mockEvent);
    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].id).toBe("evt-001");
    expect(items[0].quantity).toBe(1);
  });

  it("addToCart NÃO deve duplicar — deve incrementar quantity", () => {
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().addToCart(mockEvent);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1); // 1 entrada no array
    expect(items[0].quantity).toBe(3); // mas quantity = 3
  });

  it("addToCart deve permitir múltiplos eventos diferentes", () => {
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().addToCart(mockEvent2);

    expect(useCartStore.getState().items).toHaveLength(2);
  });

  // ── removeFromCart ────────────────────────────────────────
  it("removeFromCart deve remover o item pelo id", () => {
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().addToCart(mockEvent2);
    useCartStore.getState().removeFromCart("evt-001");

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe("evt-002");
  });

  it("removeFromCart com id inexistente não deve causar erro", () => {
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().removeFromCart("id-fantasma");

    expect(useCartStore.getState().items).toHaveLength(1);
  });

  // ── clearCart ─────────────────────────────────────────────
  it("clearCart deve esvaziar o carrinho completamente", () => {
    useCartStore.getState().addToCart(mockEvent);
    useCartStore.getState().addToCart(mockEvent2);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  // ── totalPrice ────────────────────────────────────────────
  it("totalPrice deve retornar 0 para carrinho vazio", () => {
    expect(useCartStore.getState().totalPrice()).toBe(0);
  });

  it("totalPrice deve calcular corretamente com 1 item", () => {
    useCartStore.getState().addToCart(mockEvent); // R$ 350
    expect(useCartStore.getState().totalPrice()).toBe(350);
  });

  it("totalPrice deve multiplicar price × quantity", () => {
    useCartStore.getState().addToCart(mockEvent); // qty 1 → R$ 350
    useCartStore.getState().addToCart(mockEvent); // qty 2 → R$ 700
    expect(useCartStore.getState().totalPrice()).toBe(700);
  });

  it("totalPrice deve somar múltiplos eventos", () => {
    useCartStore.getState().addToCart(mockEvent); // R$ 350
    useCartStore.getState().addToCart(mockEvent2); // R$ 500
    expect(useCartStore.getState().totalPrice()).toBe(850);
  });
});
