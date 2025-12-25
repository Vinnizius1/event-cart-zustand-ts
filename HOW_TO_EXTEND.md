# 🔧 Como Estender o Projeto

Agora que o projeto está bem estruturado, você pode adicionar funcionalidades facilmente!

---

## 📝 Exemplo 1: Adicionar DateService

### Passo 1: Criar o Service

```typescript
// services/DateService.ts
export const DateService = {
  /**
   * Formata data para português
   * @param dateString - "22 Dez, 2025 • 22:00"
   * @returns Data formatada
   */
  format(dateString: string): string {
    return dateString; // Por enquanto retorna igual
  },

  /**
   * Verifica se evento já passou
   */
  isPastEvent(dateString: string): boolean {
    // Implementação aqui
    return false;
  },

  /**
   * Retorna quantos dias faltam
   */
  daysUntilEvent(dateString: string): number {
    // Implementação aqui
    return 0;
  },
};
```

### Passo 2: Usar no Componente

```typescript
// components/EventCard.tsx
import { DateService } from "../services/DateService";

export function EventCard({ event }: EventCardProps) {
  const daysLeft = DateService.daysUntilEvent(event.date);
  const isPast = DateService.isPastEvent(event.date);

  return (
    <div className={styles.card}>
      {isPast && <span>⏰ Evento Passado</span>}
      {daysLeft > 0 && <span>⏱️ {daysLeft} dias!</span>}
      {/* ... resto do código */}
    </div>
  );
}
```

---

## 🔐 Exemplo 2: Adicionar ValidatorService

### Passo 1: Criar o Service

```typescript
// services/ValidatorService.ts
import type { Event } from "../types";

export const ValidatorService = {
  /**
   * Valida se quantidade é válida
   */
  isValidQuantity(quantity: number, maxAvailable: number): boolean {
    return quantity > 0 && quantity <= maxAvailable;
  },

  /**
   * Valida se pode adicionar ao carrinho
   */
  canAddToCart(event: Event): boolean {
    return event.availableQty > 0;
  },

  /**
   * Valida se pode fazer checkout
   */
  canCheckout(totalPrice: number): boolean {
    return totalPrice > 0;
  },

  /**
   * Valida email para checkout
   */
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
};
```

### Passo 2: Usar no EventCard

```typescript
// components/EventCard.tsx
import { ValidatorService } from "../services/ValidatorService";

export function EventCard({ event }: EventCardProps) {
  const canAdd = ValidatorService.canAddToCart(event);

  return (
    <button
      onClick={() => addToCart(event)}
      disabled={!canAdd} // ← Valida antes de permitir
    >
      {canAdd ? "Comprar" : "Indisponível"}
    </button>
  );
}
```

---

## 🌐 Exemplo 3: Adicionar EventService (API)

### Passo 1: Criar o Service

```typescript
// services/EventService.ts
import type { Event } from "../types";

interface EventResponse {
  data: Event[];
  status: number;
}

export const EventService = {
  /**
   * Busca eventos da API
   */
  async fetchEvents(): Promise<Event[]> {
    try {
      const response = await fetch("/api/events");
      const data: EventResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      return [];
    }
  },

  /**
   * Busca um evento específico
   */
  async getEventById(id: string): Promise<Event | null> {
    try {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Erro ao buscar evento ${id}:`, error);
      return null;
    }
  },

  /**
   * Reserva evento no backend
   */
  async bookEvent(eventId: string, quantity: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/events/${eventId}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      return response.ok;
    } catch (error) {
      console.error("Erro ao reservar evento:", error);
      return false;
    }
  },
};
```

### Passo 2: Usar no App

```typescript
// App.tsx
import { EventService } from "./services/EventService";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await EventService.fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <EventsList events={events} />
      {/* ... */}
    </div>
  );
}
```

---

## 🎨 Exemplo 4: Adicionar Novo Componente

### Passo 1: Criar Header Separado

```typescript
// components/Header.tsx
import type { ReactNode } from "react";
import styles from "../App.module.css";

interface HeaderProps {
  title: string;
  rightContent?: ReactNode;
}

export function Header({ title, rightContent }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {rightContent}
    </header>
  );
}
```

### Passo 2: Usar no App

```typescript
// App.tsx
function App() {
  const cart = useCartFacade();

  return (
    <div className={styles.appContainer}>
      <Header
        title="EventCart 🎟️"
        rightContent={
          <button onClick={cart.toggleCart}>
            🛒 Carrinho ({cart.getTotalItems()})
          </button>
        }
      />
      {/* ... resto */}
    </div>
  );
}
```

---

## 🧪 Exemplo 5: Testar um Service

```typescript
// services/CurrencyService.test.ts
import { describe, it, expect } from "vitest";
import { CurrencyService } from "./CurrencyService";

describe("CurrencyService", () => {
  it("deve formatar moeda corretamente", () => {
    expect(CurrencyService.format(350)).toBe("R$ 350,00");
    expect(CurrencyService.format(1000)).toBe("R$ 1.000,00");
  });

  it("deve formatar com quantidade", () => {
    expect(CurrencyService.formatWithQuantity(2, 350)).toBe("2x R$ 350,00");
  });
});
```

---

## 🚀 Arquitetura Final (Após Extensões)

```
src/
├── components/
│   ├── Header.tsx           ← NOVO
│   ├── Footer.tsx           ← NOVO
│   ├── CartDrawer.tsx
│   ├── EventCard.tsx
│   ├── EventsList.tsx
│   └── EventDetail.tsx      ← NOVO
│
├── services/
│   ├── CurrencyService.ts
│   ├── DateService.ts       ← NOVO
│   ├── ValidatorService.ts  ← NOVO
│   ├── EventService.ts      ← NOVO (API)
│   └── CheckoutService.ts   ← NOVO
│
├── hooks/
│   ├── useEventFilters.ts   ← NOVO
│   ├── useCheckout.ts       ← NOVO
│   └── useNotification.ts   ← NOVO
│
├── facade/
│   ├── CartFacade.ts
│   └── EventFacade.ts       ← NOVO
│
├── store/
│   ├── useCartStore.ts
│   └── useFilterStore.ts    ← NOVO
│
├── types/
│   └── index.ts
│
├── utils/
│   ├── constants.ts         ← NOVO
│   └── helpers.ts           ← NOVO
│
└── App.tsx
```

---

## 📋 Checklist para Adicionar Funcionalidade

Quando quiser adicionar uma nova funcionalidade, siga este padrão:

```
1. ✅ Identificar responsabilidade
   □ É lógica reutilizável? → Service
   □ É estado global? → Facade + Zustand
   □ É renderização? → Componente Presentational

2. ✅ Criar arquivo
   □ Em services/
   □ Em components/
   □ Em hooks/

3. ✅ Testar isolado
   □ Unit test para Service
   □ Component test para Componente

4. ✅ Integrar no App
   □ Usar no componente correto
   □ Passar dados via props

5. ✅ Verificar padrões
   □ Única responsabilidade?
   □ Sem duplicação?
   □ Fácil de testar?
```

---

## 💡 Dicas Importantes

### ✅ Faça

```typescript
// ✅ Service com lógica pura
export const MyService = {
  doSomething(input: string): string {
    return input.toUpperCase();
  },
};

// ✅ Componente com props claras
function MyComponent({ title, onAction }: Props) {
  return <div onClick={onAction}>{title}</div>;
}

// ✅ Facade simplificando acesso
const myState = useMynewFacade();
```

### ❌ Evite

```typescript
// ❌ Lógica dentro de componente
function MyComponent() {
  const data = await fetch("/api");
  const processed = data.map((x) => x.toUpperCase());
  return <div>{processed}</div>;
}

// ❌ Props com muitos detalhes internos
<MyComponent store={zustandStore} dispatch={dispatch} state={state} />;

// ❌ Acessar store diretamente em vários lugares
function MyComponent() {
  const { items } = useCartStore();
  const { users } = useUserStore();
  const { settings } = useSettingsStore();
  // ❌ Muito acoplado!
}
```

---

## 🎯 Próximos Passos Sugeridos

1. **Filtros de Eventos**

   - Filtrar por categoria
   - Filtrar por preço
   - Filtrar por data

2. **Favoritos**

   - Adicionar aos favoritos
   - Listar favoritos
   - Persistir no localStorage

3. **Checkout**

   - Formulário de dados
   - Validação
   - Integração com pagamento

4. **Notificações**

   - Toast notifications
   - Alertas de sucesso/erro
   - Confirmações

5. **Responsividade**
   - Versão mobile
   - Menu mobile
   - Drawer mobile

---

**Parabéns! Seu projeto está pronto para crescer!** 🚀
