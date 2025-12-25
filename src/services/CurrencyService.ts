/**
 * CurrencyService - Centraliza toda lógica de formatação de moeda
 *
 * PRINCÍPIO: Single Responsibility
 * - Apenas uma razão para mudar: se mudarmos a estratégia de formatação
 * - Reutilizável em todo o app
 * - Facilita testes
 */

const BRL_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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
