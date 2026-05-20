import styles from './SummaryBar.module.css'
import { CURRENCIES } from '../constants'
import { LuEraser } from "react-icons/lu";

function SummaryBar({ items, onClearItems, settings }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const fmt = (num) => {
    const sep = settings?.thousandSep ?? true
    return sep ? num.toLocaleString() : String(num)
  }
  const currency = CURRENCIES.find(c => c.code === (settings?.currency ?? 'KRW'))

  return (
    <div className={styles.bar}>
      <div className={styles.meta}>
        합계 · {items.length}개 · 단가 × 수량
      </div>
      <div className={styles.main}>
        <div className={styles.total}>
        <span className={styles.symbol}>{currency.symbol}</span>
          {fmt(total)}
        </div>
        <button className={styles.clearBtn} onClick={onClearItems}>
          <LuEraser /> 전체 지우기
        </button>
      </div>
    </div>
  )
}

export default SummaryBar