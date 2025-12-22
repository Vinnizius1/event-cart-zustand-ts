// src/store/useCartStore.ts
import { create } from "zustand";
import type { CartState } from "../types";

/* Antes era "import { CartState } from "../types";" e dava erro. */
/* Por que isso acontece?
Quando o código é transpilado (transformado de TS para JS), o JavaScript final "apaga" tudo que é tipagem, pois o navegador não entende interfaces.
Ao usar import type, você diz ao compilador: 
"Ei, isso aqui é só pro meu desenvolvimento, pode apagar essa linha quando for gerar o JS final". 
Isso deixa o código final mais leve e evita erros de referência circular. */

export const useCartStore = create<CartState>((set, get) => ({
  // Estado inicial
  items: [],
  isOpen: false,

  // Ações (Actions)

  // Abrir/Fechar o carrinho
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  // Adicionar item (Lógica Inteligente)
  addToCart: (event) =>
    set((state) => {
      // 1. Verifica se o item já existe no carrinho
      const existingItem = state.items.find((item) => item.id === event.id);

      // 2. Se já existe, só aumenta a quantidade (+1)
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === event.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // 3. Se não existe, adiciona o evento novo com quantidade 1
      return {
        items: [...state.items, { ...event, quantity: 1 }],
      };
    }),

  // Remover item completamente
  removeFromCart: (eventId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== eventId),
    })),

  // Limpar tudo
  clearCart: () => set({ items: [] }),

  // Calcular Total (O Reduce é o "acumulador" do JS)
  totalPrice: () => {
    // Pega o estado atual
    const { items } = get();
    // Multiplica preço * quantidade de cada item e soma tudo
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
