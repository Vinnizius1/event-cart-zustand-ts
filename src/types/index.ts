// Define o que é um Evento de Show
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: number; // Preço sempre number para cálculos!
  availableQty: number; // Para controlar estoque
}

// Define como o item fica DENTRO do carrinho
// (É o evento + a quantidade que o usuário quer comprar)
export interface CartItem extends Event {
  quantity: number;
}

// Define o formato da nossa "Store" (o estado global do Zustand)
export interface CartState {
  items: CartItem[];
  isOpen: boolean; // O carrinho está aberto ou fechado?
  addToCart: (event: Event) => void;
  removeFromCart: (eventId: string) => void;
  toggleCart: () => void; // Abrir/fechar
  clearCart: () => void;
  totalPrice: () => number; // Função que retorna o valor final
}
