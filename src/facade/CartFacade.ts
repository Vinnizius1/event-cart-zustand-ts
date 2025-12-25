/**
 * CartFacade - Padrão FACADE
 *
 * PROPÓSITO: Abstrair a complexidade do Zustand e lógica de negócio
 * - O App.tsx e componentes NÃO precisam saber detalhes do Zustand
 * - Oferece uma interface simples e clara
 * - Se trocar o Zustand por Redux/Context, só muda aqui
 *
 * RESPONSABILIDADES:
 * - Acesso ao estado do carrinho
 * - Orquestração de ações
 * - Cálculos derivados (totalItems, totalPrice)
 */

import { useCartStore } from "../store/useCartStore";

export const useCartFacade = () => {
  const store = useCartStore();

  return {
    // --- Estado ---
    items: store.items,
    isCartOpen: store.isOpen,

    // --- Ações ---
    addItem: store.addToCart,
    removeItem: store.removeFromCart,
    toggleCart: store.toggleCart,
    clearCart: store.clearCart,

    // --- Cálculos Derivados ---
    // Quantidade total de itens no carrinho
    getTotalItems: () =>
      store.items.reduce((acc, item) => acc + item.quantity, 0),

    // Preço total
    getTotalPrice: () => store.totalPrice(),

    // Verifica se carrinho está vazio
    isCartEmpty: () => store.items.length === 0,

    // Obtém um item específico
    getItem: (eventId: string) =>
      store.items.find((item) => item.id === eventId),

    // Conta quantos tipos diferentes de itens tem
    getItemCount: () => store.items.length,
  };
};
