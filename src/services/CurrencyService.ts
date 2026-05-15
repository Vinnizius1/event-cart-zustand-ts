// Intl.NumberFormat é uma API nativa do JavaScript para formatação de números, incluindo moedas.
// O Intl.NumberFormat é um Construtor. Quando você faz new Intl.NumberFormat(),
// ele retorna um objeto de instância. Esse objeto possui um método chamado format.
const BRL_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * CurrencyService - Centraliza toda lógica de formatação de moeda
 *
 * PRINCÍPIO: Single Responsibility
 * - Apenas uma razão para mudar: se mudarmos a estratégia de formatação
 * - Reutilizável em todo o app
 * - Facilita testes unitários (mocking)
 *
 * OPÇÃO A: PADRÃO DE OBJETO (Service Pattern)
 * Ideal para: Organização, Descoberta de código (IntelliSense) e Mocking em testes.
 */
export const CurrencyService = {
  /**
   * Formata um número para moeda brasileira
   * @param value - Valor a formatar
   * @returns String formatada ex: "R$ 350,00"
   */
  format(value: number): string {
    return BRL_FORMATTER.format(value);
  },

  /**
   * Formata um número com quantidade
   * @param quantity - Quantidade
   * @param price - Preço unitário
   * @returns String formatada ex: "2x R$ 350,00"
   */
  formatWithQuantity(quantity: number, price: number): string {
    return `${quantity}x ${this.format(price)}`;
  },
};

/**
 * OPÇÃO B: FUNÇÕES NOMEADAS (Named Exports)
 * Ideal para: Tree Shaking (redução de tamanho do bundle) e utilitários genéricos.
 * Vantagem: Permite importar apenas o que é necessário, potencialmente reduzindo o tamanho do bundle.
 * Desvantagem: Menos organizado, pode ser difícil descobrir quais funções estão disponíveis.
 *
 * Formata um número para moeda brasileira
 * @example formatCurrency(350) -> "R$ 350,00"
 */
export function formatCurrency(value: number): string {
  return BRL_FORMATTER.format(value);
}

/**
 * Formata um número com quantidade
 * @example formatCurrencyWithQuantity(2, 350) -> "2x R$ 350,00"
 */
export function formatCurrencyWithQuantity(
  quantity: number,
  price: number,
): string {
  return `${quantity}x ${formatCurrency(price)}`;
}
