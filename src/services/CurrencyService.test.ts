import { describe, it, expect } from "vitest";
import { CurrencyService } from "@/services/CurrencyService";

describe("CurrencyService", () => {
  describe("format()", () => {
    it("formata um número inteiro em BRL", () => {
      expect(CurrencyService.format(350)).toBe("R$\u00a0350,00");
    });

    it("formata zero como R$ 0,00", () => {
      expect(CurrencyService.format(0)).toBe("R$\u00a00,00");
    });

    it("formata valores decimais corretamente", () => {
      expect(CurrencyService.format(99.9)).toBe("R$\u00a099,90");
    });
  });

  describe("formatWithQuantity()", () => {
    it("exibe quantidade e preço formatados", () => {
      expect(CurrencyService.formatWithQuantity(2, 350)).toBe(
        "2x R$\u00a0350,00",
      );
    });

    it("funciona com quantidade 1", () => {
      expect(CurrencyService.formatWithQuantity(1, 100)).toBe(
        "1x R$\u00a0100,00",
      );
    });
  });
});
