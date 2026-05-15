import type { CartItem } from "../../../types";
import { CurrencyService } from "../../../services/CurrencyService";
import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  /** Controla a visibilidade do drawer. Se `false`, o componente retorna `null`. */
  isOpen: boolean;
  /** Lista de itens atualmente no carrinho (id, título, preço e quantidade). */
  items: CartItem[];
  /** Valor total bruto calculado, geralmente vindo do `CartFacade`. */
  totalPrice: number;
  /** Callback disparado para fechar o drawer (ex: clicar no X ou fora dele). */
  onClose: () => void;
  /** Callback disparado para remover um item específico através do seu ID de evento. */
  onRemoveItem: (eventId: string) => void;
}

/**
 * CartDrawer - Drawer do Carrinho (Presentational Component)
 *
 * @component
 * @description Componente apresentacional responsável por renderizar a interface lateral do carrinho de compras.
 * Ele exibe os itens adicionados, o preço total e botões de ação.
 *
 *
 * @returns {JSX.Element | null} O elemento JSX do drawer do carrinho ou `null` se `isOpen` for `false`.
 *
 * @example
 * <CartDrawer
 *   isOpen={true}
 *   items={[{ id: '1', title: 'Evento A', price: 100, quantity: 1 }]}
 *   totalPrice={100}
 *   onClose={() => console.log('Fechar')}
 *   onRemoveItem={(id) => console.log('Remover', id)}
 * />
 */
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
                    item.price,
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
