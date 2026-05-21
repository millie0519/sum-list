import styles from './SummaryBar.module.css'
import { CURRENCIES } from '../constants'
import { LuEraser } from "react-icons/lu";

function SummaryBar({ items, onClearItems, settings }) {
  const total = items.reduce((sum, item) => {
    let amt = item.price * item.quantity
    if (settings?.discount) amt *= (1 - (item.discount || 0) / 100)
    if (settings?.vat) amt *= (1 + (item.vat || 0) / 100)
    return sum + amt
  }, 0)
  const fmt = (num) => {
    const sep = settings?.thousandSep ?? true
    const fixed = Number(num.toFixed(2))
    return sep ? fixed.toLocaleString() : String(fixed)
  }
  const currency = CURRENCIES.find(c => c.code === (settings?.currency ?? 'KRW'))

  return (
    <div className={styles.bar}>
      <div className={styles.meta}>
        합계 · {items.length}개 · 단가 × 수량
        {settings?.discount && ' x (1-할인%)'}
        {settings?.vat && ' x (1+부가세%)'}
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