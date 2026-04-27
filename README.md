# 🎟️ EventCart - Ticket Purchase Flow

> Um simulador de fluxo de compra de ingressos focado em **Gestão de Estado Crítico** e **Tipagem Segura**.

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Zustand](https://img.shields.io/badge/State-Zustand-orange)

## 🎯 Objetivo

Demonstrar a implementação de um carrinho de compras performático e seguro, simulando desafios reais de plataformas de ingressos (como BaladAPP/Ticketmaster), onde a integridade dos dados financeiros (preço/quantidade) é prioritária.

## 🛠️ Stack & Decisões Técnicas

| Tecnologia               | Por que foi escolhida?                                                                                                                |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **React + TypeScript**   | Garantia de integridade de dados (preços sempre numéricos) e DX superior.                                                             |
| **Design Patterns**      | Facade Pattern (CartFacade), Container/Presentational, Service Layer                                                                  |
| **Zustand**              | Gerenciamento de estado global minimalista para evitar _prop drilling_ entre Lista de Eventos e Carrinho, sem a verbosidade do Redux. |
| **CSS Modules / Inline** | Estilização escopada e ágil para focar na lógica de negócio.                                                                          |
| **Vite**                 | Build tool moderna para feedback instantâneo durante o desenvolvimento.                                                               |

## 🚀 Funcionalidades Atuais

- [x] **Listagem de Eventos**: Renderização dinâmica baseada em mocks tipados.
- [x] **Carrinho Inteligente**: Lógica para adicionar/remover e calcular totais em tempo real.
- [x] **UX Resiliente**: Fallback automático para imagens quebradas (sem exibir ícones de erro).
- [x] **Tipagem Estrita**: Interfaces `Event`, `CartItem` e `CartState` para blindar o código.

## 🧠 Lições Aprendidas (Highlights)

1. **Zustand vs Context API**: O uso do Zustand simplificou a lógica de `selectors`, evitando re-renderizações desnecessárias que ocorreriam com Context API nativa em um carrinho complexo.
2. **Fallback de Imagem**: Implementação de um `useState` local no componente `EventCard` para gerenciar erros de carregamento de imagem de forma graciosa.

## 🧪 Testes

- **33 testes** cobrindo store, serviços e componentes
- Ferramentas: **Vitest** + **React Testing Library**
- Rodar: `npm test`

## 🔜 Próximos Passos

- Implementação de Testes E2E com **Playwright**.
- Persistência de carrinho no `localStorage`.
- Melhorias de Acessibilidade (a11y).

---

Desenvolvido por [Vinicius](https://www.linkedin.com/in/vinmm/)
