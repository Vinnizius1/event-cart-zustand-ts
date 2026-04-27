# 🏗️ Arquitetura e Padrões de Design - EventCart

## 📋 Resumo Executivo

O projeto foi refatorado para seguir **boas práticas de separação de responsabilidades** usando padrões de design reconhecidos na indústria.

---

## 🎯 Problema Original

**App.tsx** tinha muitas responsabilidades:

```
App.tsx
├── Renderização de UI (JSX)
├── Formatação de moeda 💰
├── Cálculos (totalItems)
├── Gerenciamento de estado (Zustand)
├── Renderização do carrinho 🛒
└── Renderização da lista de eventos 📋
```

Isso **viola o Single Responsibility Principle (SRP)** - uma classe/componente deve ter apenas uma razão para mudar.

---

## ✅ Solução Implementada

### 1️⃣ **Service Layer Pattern** - CurrencyService

**O que é?**

- Classe/módulo que centraliza lógica reutilizável
- Sem estado (stateless) - apenas funções puras

**Quando usar?**

- Formatação de dados
- Cálculos complexos
- Integrações com APIs
- Validações

**Exemplo:**

```typescript
// ❌ RUIM - Duplicado em vários lugares
{new Intl.NumberFormat("pt-BR", {...}).format(price)}
{new Intl.NumberFormat("pt-BR", {...}).format(price)}

// ✅ BOM - Centralizado
CurrencyService.format(price)
```

**Benefícios:**

- ✅ Fácil de testar
- ✅ Reutilizável em todo app
- ✅ Se mudar a lógica, muda em um lugar
- ✅ Sem acoplamento a React

---

### 2️⃣ **Facade Pattern** - CartFacade

**O que é?**

- Interface simplificada que abstrai complexidade
- Fornece um "contrato" clara entre componentes e estado
- Se trocar Zustand por Redux/Context, muda apenas aqui

**Quando usar?**

- Abstrair state management
- Simplificar acesso a estado complexo
- Criar uma barreira entre UI e lógica

**Exemplo:**

```typescript
// ❌ ANTES - App.tsx acoplado ao Zustand
const { items, toggleCart, isOpen, removeFromCart, totalPrice } =
  useCartStore();
const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

// ✅ DEPOIS - App.tsx desacoplado
const cart = useCartFacade();
// Agora App não precisa saber como totalItems é calculado
cart.getTotalItems();
```

**Benefícios:**

- ✅ Interface clara e bem definida
- ✅ Fácil de mockar em testes
- ✅ Manutenção centralizada
- ✅ Escalável (adicionar métodos novos é simples)

---

### 3️⃣ **Container/Presentational Pattern**

**App.tsx** (Container - Smart)

```typescript
- Gerencia estado (via Facade)
- Orquestra componentes
- Lida com lógica de dados
```

**EventsList / CartDrawer** (Presentational - Dumb)

```typescript
- Recebem dados via props
- Apenas renderizam UI
- Comunicam via callbacks
```

**Benefícios:**

- ✅ Componentes reutilizáveis
- ✅ Fácil testar (props são previsíveis)
- ✅ Separação clara de responsabilidades

---

## 📁 Estrutura de Pastas

```
src/
├── components/              (Presentational Components)
│   ├── EventCard.tsx       - Renderiza 1 evento
│   ├── CartDrawer.tsx      - Renderiza carrinho
│   └── EventsList.tsx      - Renderiza lista de eventos
│
├── services/               (Lógica Reutilizável)
│   └── CurrencyService.ts  - Formatação de moeda
│
├── facade/                 (Abstração de Estado)
│   └── CartFacade.ts       - Interface do carrinho
│
├── store/                  (Estado Global)
│   └── useCartStore.ts     - Zustand store (implementação)
│
├── data/                   (Dados Estáticos)
│   └── mockEvents.ts
│
├── types/                  (TypeScript)
│   └── index.ts
│
└── App.tsx                 (Container/Orquestrador)
```

---

## 🔄 Fluxo de Dados

```
App.tsx (Container)
    ↓
    ├─→ useCartFacade()         [Facade - abstrai estado]
    │       ↓
    │   useCartStore()           [Zustand - estado real]
    │
    ├─→ <EventsList />           [Presentational]
    │       ↓
    │   <EventCard />            [Presentational]
    │       ↓
    │   CurrencyService.format() [Service]
    │
    └─→ <CartDrawer />           [Presentational]
            ↓
        CurrencyService.format() [Service]
```

---

## 🧪 Por que isso é melhor para testes?

### Antes (Difícil)

```typescript
// App.tsx faz tudo - difícil mockar
const mockStore = {
  items: [...],
  toggleCart: jest.fn(),
  // ... todos os detalhes internos
};
```

### Depois (Fácil)

```typescript
// CartFacade fornece interface clara
const mockFacade = {
  toggleCart: jest.fn(),
  getTotalItems: () => 2,
  getTotalPrice: () => 700,
  // Você sabe exatamente o que mockar
};
```

---

## 📊 Comparação de Padrões

| Padrão                       | Quando Usar           | Complexidade |
| ---------------------------- | --------------------- | ------------ |
| **Service Layer**            | Lógica reutilizável   | Baixa        |
| **Facade**                   | Abstrair complexidade | Média        |
| **Container/Presentational** | Organizar componentes | Média        |
| **Observer (Zustand)**       | Estado global         | Média        |

---

## 💡 Próximas Melhorias (Opcional)

### 1. Custom Hooks para Lógica Recorrente

```typescript
// hooks/useEventFilters.ts
export function useEventFilters() {
  const [filters, setFilters] = useState({});
  // ... lógica de filtro
  return { filters, setFilters };
}
```

### 2. Context API para Temas

```typescript
// Trocar tema do app (light/dark)
export const ThemeContext = createContext();
```

### 3. Error Boundary

```typescript
// Capturar erros de componentes filhos
<ErrorBoundary>
  <EventsList />
</ErrorBoundary>
```

### 4. API Service Layer

```typescript
// services/EventService.ts
export const EventService = {
  async getEvents() {
    /* fetch */
  },
  async bookEvent(eventId) {
    /* post */
  },
};
```

---

## 🎓 Aprendizados Principais

1. **Single Responsibility** - cada arquivo tem UMA responsabilidade
2. **Abstração** - Facade esconde complexidade
3. **Reutilização** - Services compartilham lógica
4. **Testabilidade** - Componentes Presentational são fáceis testar
5. **Manutenibilidade** - Código organizado é mais fácil manter

---

## 🚀 Como Executar

```bash
npm install
npm run dev
```

O app deve funcionar exatamente igual ao anterior, mas com arquitetura muito mais limpa! ✨

---

**Criado em:** 24 de Dezembro de 2025
**Autor:** Refatoração com Padrões de Design
