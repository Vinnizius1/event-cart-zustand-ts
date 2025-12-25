/**
 * CartDrawer - Drawer do Carrinho (Presentational Component)
 *
 * RESPONSABILIDADES:
 * - Renderizar a UI do carrinho
 * - Exibir itens
 * - Lidar com eventos de UI
 *
 * NÃO SABE COMO:
 * - Gerenciar estado (vem por props)
 * - Calcular totais
 */

import type { CartItem } from "../types";
import { CurrencyService } from "../services/CurrencyService";
import styles from "../App.module.css";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onRemoveItem: (eventId: string) => void;
}

export function CartDrawer({
  isOpen,
  items,
  totalPrice,
  onClose,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <aside className={styles.drawer}>
      <div className={styles.drawerHeader}>
        <h2>Seu Carrinho</h2>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
      </div>

      <div className={styles.cartItemsList}>
        {items.length === 0 ? (
          <p className={styles.emptyCartMessage}>Seu carrinho está vazio.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div>
                <p className={styles.cartItemTitle}>{item.title}</p>
                <p className={styles.cartItemInfo}>
                  {CurrencyService.formatWithQuantity(
                    item.quantity,
                    item.price
                  )}
                </p>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className={styles.removeItemButton}
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.drawerFooter}>
        <div className={styles.totalSection}>
          <span>Total:</span>
          <span>{CurrencyService.format(totalPrice)}</span>
        </div>
        <button className={styles.checkoutButton}>Finalizar Compra</button>
      </div>
    </aside>
  );
}
