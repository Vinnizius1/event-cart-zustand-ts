# 📚 Guia de Padrões - EventCart

## 🎯 Comparação Visual: ANTES vs DEPOIS

### ❌ ANTES - Problema

```
App.tsx (151 linhas)
├── Estado do Zustand
├── Lógica de cálculo
├── Formatação de moeda
├── Renderização do header
├── Renderização da lista
└── Renderização do carrinho

⚠️ Muitas responsabilidades!
```

### ✅ DEPOIS - Solução

```
App.tsx (52 linhas) ← Muito menor!
├── Orquestra componentes
└── Delega lógica

   ├── CartFacade (Padrão: Facade)
   │   └── Abstrai estado do Zustand
   │
   ├── CurrencyService (Padrão: Service)
   │   └── Formata moeda
   │
   ├── EventsList (Padrão: Presentational)
   │   ├── EventCard
   │   └── usa CurrencyService
   │
   └── CartDrawer (Padrão: Presentational)
       └── usa CurrencyService

✅ Cada arquivo com UMA responsabilidade!
```

---

## 🔍 Padrão Facade - Entendendo

### O Problema que Resolve

Imagine uma casa com muitos interruptores espalhados. Facade é como um painel de controle centralizado.

```typescript
// ❌ Sem Facade (Controlando vários interruptores)
const {
  items,
  toggleCart,
  isOpen,
  removeFromCart,
  totalPrice,
  addToCart,
  clearCart,
} = useCartStore();

// ??? Como calcular total de itens?
const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

// ??? Carrinho está vazio?
const isEmpty = items.length === 0;

// Seu componente precisa saber TUDO sobre o Zustand!
```

```typescript
// ✅ Com Facade (Um único painel de controle)
const cart = useCartFacade();

// Interface clara e intuitiva:
cart.getTotalItems(); // Preciso do total? Aqui!
cart.isCartEmpty(); // Carrinho vazio?
cart.toggleCart(); // Abrir/fechar
cart.addItem(); // Adicionar
cart.removeItem(); // Remover
cart.getTotalPrice(); // Preço total

// Você NÃO precisa saber como funciona internamente!
```

### Benefício Real

Se você trocar Zustand por Redux:

```typescript
// ❌ Sem Facade: Muda em TODOS os componentes
// store/Redux.ts
// App.tsx - muda
// EventCard.tsx - muda
// CartDrawer.tsx - muda
// ... 10 outros arquivos mudam

// ✅ Com Facade: Muda em UM lugar
// facade/CartFacade.ts - muda aqui
// Todos os componentes continuam iguais! ✨
```

---

## 💾 Padrão Service - Entendendo

### Centralização de Lógica Reutilizável

```typescript
// ❌ Sem Service (Lógica espalhada)
// App.tsx
const formatCurrency = (v) => new Intl.NumberFormat(...).format(v);

// EventCard.tsx
const formatCurrency = (v) => new Intl.NumberFormat(...).format(v);

// CartDrawer.tsx
const formatCurrency = (v) => new Intl.NumberFormat(...).format(v);

// ❌ Problema: Se mudar, muda em 3 lugares!
```

```typescript
// ✅ Com Service (Lógica centralizada)
// services/CurrencyService.ts
export const CurrencyService = {
  format(value: number): string { ... }
};

// Em qualquer lugar:
import { CurrencyService } from "@/services";
CurrencyService.format(350)  // Reutilizável!

// ✅ Benefício: Muda em 1 lugar, funciona em 10 lugares!
```

---

## 🏗️ Padrão Container/Presentational

### Smart Component (App.tsx)

```typescript
✅ O que faz:
  - Acessa estado (via Facade)
  - Lógica de negócio
  - Orquestra filhos
  - Manipula dados

❌ O que NÃO faz:
  - Renderiza UI complexa
  - Formata dados para exibição
  - Gerencia UI state (como hover)
```

### Dumb Components (EventCard, CartDrawer)

```typescript
✅ O que faz:
  - Recebe dados via props
  - Renderiza UI
  - Dispara callbacks

❌ O que NÃO faz:
  - Acessa estado direto
  - Lógica de negócio
  - Cálculos complexos
```

### Exemplo Prático

```typescript
// Container (Smart)
function App() {
  const cart = useCartFacade(); // ← Acessa estado

  return (
    <CartDrawer
      items={cart.items} // ← Passa dados
      onRemove={cart.removeItem} // ← Passa funções
    />
  );
}

// Presentational (Dumb)
function CartDrawer({ items, onRemove }) {
  return (
    <div>
      {items.map((item) => (
        <button onClick={() => onRemove(item.id)}>Remover</button>
      ))}
    </div>
  );
}
```

**Benefício:** CartDrawer é 100% reutilizável em outro app!

---

## 📊 Fluxo de Dados - Detalhado

```
┌─────────────────────────────────────────────────┐
│ App.tsx (Container - Smart)                     │
│ - Acessa CartFacade                             │
│ - Orquestra componentes                         │
│ - Passa dados via props                         │
└──────────────┬──────────────────────────────────┘
               │
        ┌──────┴────────┬───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌────────────────┐
│ EventsList   │ │ CartDrawer   │ │ useCartFacade  │
│ (Props)      │ │ (Props)      │ │ (Hook)         │
│              │ │              │ │                │
│ - events     │ │ - items      │ │ - getTotalItems│
│ - onAdd      │ │ - totalPrice │ │ - removeItem   │
└──────────────┘ │ - onRemove   │ │ - getTotalPrice│
       │         └──────────────┘ └────────┬────────┘
       │                                    │
       ▼                                    ▼
   EventCard                        useCartStore
   (Props)                          (Zustand)
   - event                          - items
   - onAdd                          - addToCart
                                    - removeFromCart
```

---

## 🧪 Testabilidade Comparada

### Teste SEM Facade (Difícil)

```typescript
test("calcula total correto", () => {
  // Precisar mockar TUDO do Zustand
  const mockStore = {
    items: [
      { id: 1, price: 100, quantity: 2 },
      { id: 2, price: 50, quantity: 1 },
    ],
    toggleCart: jest.fn(),
    isOpen: true,
    removeFromCart: jest.fn(),
    totalPrice: jest.fn(() => 250),
    addToCart: jest.fn(),
    clearCart: jest.fn(),
  };

  // 🤔 Muito código de setup!
});
```

### Teste COM Facade (Simples)

```typescript
test("calcula total correto", () => {
  const mockCart = {
    getTotalItems: jest.fn(() => 3),
    getTotalPrice: jest.fn(() => 250),
    toggleCart: jest.fn(),
    // ... apenas o que você precisa
  };

  // ✨ Mais simples e claro!
});
```

---

## 🚀 Próximos Passos Sugeridos

### 1. Adicionar Validação (Service)

```typescript
// services/CartValidator.ts
export const CartValidator = {
  isValidQuantity(qty: number): boolean { ... },
  canAddToCart(event: Event): boolean { ... },
};
```

### 2. Adicionar Data Formatter (Service)

```typescript
// services/DateService.ts
export const DateService = {
  format(date: string): string { ... },
  isEventUpcoming(date: string): boolean { ... },
};
```

### 3. Adicionar API Integration (Service)

```typescript
// services/EventService.ts
export const EventService = {
  async fetchEvents(): Promise<Event[]> { ... },
  async bookEvent(eventId: string): Promise<void> { ... },
};
```

### 4. Adicionar Error Handling (Component)

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component { ... }
```

---

## 💡 Regra de Ouro

```
┌─────────────────────────────────────┐
│ CADA ARQUIVO = UMA RESPONSABILIDADE │
├─────────────────────────────────────┤
│ App.tsx          → Orquestração     │
│ CartDrawer.tsx   → Renderização     │
│ EventCard.tsx    → Renderização     │
│ CartFacade.ts    → Abstração        │
│ CurrencyService  → Formatação       │
│ useCartStore.ts  → Estado           │
│ types/index.ts   → Tipos            │
└─────────────────────────────────────┘
```

Se um arquivo tem 2+ responsabilidades → **refatore!**

---

## 📈 Métricas de Qualidade

| Métrica              | Antes                 | Depois         | ✅ Melhoria  |
| -------------------- | --------------------- | -------------- | ------------ |
| Linhas em App.tsx    | 151                   | 52             | -66%         |
| Duplicação de código | 3x formatCurrency     | 1x Service     | 100% redução |
| Acoplamento          | Alto (Zustand direto) | Baixo (Facade) | ✅           |
| Testabilidade        | Difícil               | Fácil          | ✅           |
| Manutenibilidade     | Média                 | Alta           | ✅           |

---

**Créditos:** Refatoração com padrões de design | Dezembro 2025
