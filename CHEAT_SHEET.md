# 🎨 Cheat Sheet - Referência Rápida

## 🚀 Começar Rápido

```bash
# Clonar/navegar para o projeto
cd e:\CÓDIGOS\BalladAPP\EventCart-Perplexity-Gemini3Pro\eventcart

# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Fazer build
npm run build
```

---

## 📋 Estrutura Pronta

```
src/
├── services/            ← Lógica reutilizável
│   └── CurrencyService  ← Formatação
├── facade/              ← Abstração de estado
│   └── CartFacade       ← Interface do carrinho
├── components/          ← UI apenas (Presentational)
│   ├── EventCard        ← Evento individual
│   ├── EventsList       ← Lista de eventos
│   └── CartDrawer       ← Carrinho
├── store/               ← Estado global (Zustand)
│   └── useCartStore
├── data/                ← Dados estáticos
│   └── mockEvents
├── types/               ← TypeScript
│   └── index
└── App.tsx              ← Orquestrador
```

---

## 🎯 Como Usar Cada Padrão

### 1. Usar um Service

```typescript
import { CurrencyService } from "@/services";

// Formatar moeda
const formatted = CurrencyService.format(350);
// Resultado: "R$ 350,00"

// Com quantidade
const withQty = CurrencyService.formatWithQuantity(2, 350);
// Resultado: "2x R$ 350,00"
```

### 2. Usar Facade

```typescript
import { useCartFacade } from "@/facade";

function MyComponent() {
  const cart = useCartFacade();

  return (
    <div>
      <p>Total: {cart.getTotalItems()} itens</p>
      <p>Preço: {CurrencyService.format(cart.getTotalPrice())}</p>
      <button onClick={() => cart.toggleCart()}>Abrir Carrinho</button>
    </div>
  );
}
```

### 3. Criar Componente Presentational

```typescript
// components/MeuComponente.tsx
interface MinhaProps {
  title: string;
  items: string[];
  onAction: () => void;
}

export function MeuComponente({ title, items, onAction }: MinhaProps) {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onAction}>Fazer Algo</button>
    </div>
  );
}
```

---

## 📝 Criar Novo Service

### Template

```typescript
// services/MeuService.ts
export const MeuService = {
  /**
   * Descrição da função
   * @param param - Descrição
   * @returns Descrição do retorno
   */
  meuMetodo(param: string): string {
    return param.toUpperCase();
  },

  outroMetodo(valor: number): boolean {
    return valor > 0;
  },
};
```

### Usar Então

```typescript
import { MeuService } from "@/services";

MeuService.meuMetodo("olá"); // "OLÁ"
MeuService.outroMetodo(5); // true
```

---

## 📝 Criar Novo Facade

### Template

```typescript
// facade/MeuFacade.ts
import { useMeuStore } from "@/store";

export const useMeuFacade = () => {
  const store = useMeuStore();

  return {
    // Estado
    items: store.items,
    isOpen: store.isOpen,

    // Ações
    add: store.add,
    remove: store.remove,
    toggle: store.toggle,

    // Getters
    getTotalItems: () => store.items.length,
    isEmpty: () => store.items.length === 0,
  };
};
```

### Usar Então

```typescript
import { useMeuFacade } from "@/facade";

function MeuComponente() {
  const meu = useMeuFacade();

  return (
    <button onClick={meu.toggle}>{meu.isOpen ? "Fechar" : "Abrir"}</button>
  );
}
```

---

## 🎨 Padrão: Container (Smart)

```typescript
// App.tsx ou componente pai
import { useCartFacade } from "@/facade";
import { MeuComponente } from "@/components";

export default function App() {
  const cart = useCartFacade();

  return <MeuComponente data={cart.items} onAction={cart.toggleCart} />;
}
```

## 🎨 Padrão: Presentational (Dumb)

```typescript
// components/MeuComponente.tsx
interface Props {
  data: any[];
  onAction: () => void;
}

export function MeuComponente({ data, onAction }: Props) {
  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
      <button onClick={onAction}>Ação</button>
    </div>
  );
}
```

---

## 🧪 Testar um Service

```typescript
// __tests__/CurrencyService.test.ts
import { describe, it, expect } from "vitest";
import { CurrencyService } from "@/services";

describe("CurrencyService", () => {
  it("formata corretamente", () => {
    expect(CurrencyService.format(100)).toBe("R$ 100,00");
  });

  it("formata com quantidade", () => {
    expect(CurrencyService.formatWithQuantity(2, 100)).toBe("2x R$ 100,00");
  });
});
```

---

## ✅ Checklist: Adicionar Feature

```
1. PLANAR
   ☐ Identificar responsabilidade
   ☐ Escolher padrão (Service/Facade/Component)
   ☐ Planejar estrutura

2. IMPLEMENTAR
   ☐ Criar arquivo
   ☐ Implementar lógica
   ☐ Adicionar tipos (TypeScript)
   ☐ Documentar com comentários

3. INTEGRAR
   ☐ Importar onde precisa
   ☐ Usar no componente correto
   ☐ Verificar tipos

4. TESTAR
   ☐ Testar no navegador
   ☐ Verificar console
   ☐ Rodar build

5. DOCUMENTAR
   ☐ Adicionar comentários
   ☐ Atualizar README
   ☐ Registrar mudanças
```

---

## 🎯 Decisão Rápida: Onde Colocar Código?

```
┌─────────────────────────────┐
│ Tipo de Código              │ Onde?
├─────────────────────────────┤
│ Formatação (moeda, data)    │ → services/
│ Validação                   │ → services/
│ Cálculos                    │ → services/
│ Integração API              │ → services/
├─────────────────────────────┤
│ Abstração de estado         │ → facade/
│ Simplificar acesso          │ → facade/
├─────────────────────────────┤
│ Apenas renderizar UI        │ → components/
│ Receber props e callbacks   │ → components/
├─────────────────────────────┤
│ Estado global               │ → store/
│ Dados que mudam             │ → store/
├─────────────────────────────┤
│ Tipos TypeScript            │ → types/
│ Interfaces                  │ → types/
└─────────────────────────────┘
```

---

## 📊 Antes vs Depois em 10 Segundos

### Antes ❌

```typescript
// App.tsx - 151 linhas
function App() {
  const { items, toggleCart, isOpen, removeFromCart, totalPrice } =
    useCartStore();

  const formatCurrency = (v) =>
    new Intl.NumberFormat("pt-BR", {...}).format(v);

  const totalItems = items.reduce(...);

  return (
    // ... muito JSX aqui
  );
}
```

### Depois ✅

```typescript
// App.tsx - 52 linhas
function App() {
  const cart = useCartFacade();

  return (
    <>
      <EventsList events={EVENTS} />
      <CartDrawer {...cart} />
    </>
  );
}
```

---

## 🚀 Add. Feature: DateService (Exemplo)

### Passo 1: Criar Service

```typescript
// services/DateService.ts
export const DateService = {
  format(dateStr: string): string {
    return dateStr; // seu format
  },

  daysUntil(dateStr: string): number {
    // seu cálculo
    return 0;
  },
};
```

### Passo 2: Usar no Componente

```typescript
// components/EventCard.tsx
import { DateService } from "@/services";

export function EventCard({ event }) {
  const days = DateService.daysUntil(event.date);

  return (
    <div>
      <p>{DateService.format(event.date)}</p>
      {days > 0 && <p>Faltam {days} dias!</p>}
    </div>
  );
}
```

---

## 🎁 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor local
npm run build        # Build production
npm run lint         # Verificar código
npm run preview      # Preview do build

# Git
git add .
git commit -m "message"
git push

# Tipo checking
npx tsc --noEmit     # Verificar tipos
```

---

## 📚 Documentos por Tema

| Tema           | Documento                  |
| -------------- | -------------------------- |
| **Rápido**     | `QUICK_SUMMARY.md`         |
| **Completo**   | `ARCHITECTURE.md`          |
| **Padrões**    | `DESIGN_PATTERNS_GUIDE.md` |
| **Visuais**    | `ARCHITECTURE_DIAGRAMS.md` |
| **Extensão**   | `HOW_TO_EXTEND.md`         |
| **Comparação** | `BEFORE_AFTER.md`          |

---

## 💾 Arquivo do Projeto

```
e:\CÓDIGOS\BalladAPP\EventCart-Perplexity-Gemini3Pro\eventcart
├── src/
│   ├── services/
│   │   └── CurrencyService.ts
│   ├── facade/
│   │   └── CartFacade.ts
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── EventCard.tsx
│   │   └── EventsList.tsx
│   ├── store/
│   │   └── useCartStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── mockEvents.ts
│   └── App.tsx
│
├── ARCHITECTURE.md
├── DESIGN_PATTERNS_GUIDE.md
├── ARCHITECTURE_DIAGRAMS.md
├── HOW_TO_EXTEND.md
├── BEFORE_AFTER.md
├── COMPLETION_SUMMARY.md
└── README_DOCS.md
```

---

## ✨ Resumo

✅ **App.tsx** reduzido de 151 para 52 linhas  
✅ **3 Padrões** aplicados (Facade, Service, Container/Presentational)  
✅ **0 Duplicação** de código  
✅ **100% Testável** e **Escalável**  
✅ **Documentação Completa**

---

**Happy Coding!** 🚀

_Última atualização: 24 de Dezembro de 2025_
