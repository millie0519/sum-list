import styles from './SummaryBar.module.css'
import { LuEraser } from "react-icons/lu";

function SummaryBar({ items, onClearItems }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={styles.bar}>
      <div className={styles.meta}>
        합계 · {items.length}개 · 단가 × 수량
      </div>
      <div className={styles.main}>
        <div className={styles.total}>
          <span className={styles.symbol}>₩</span>
          {total.toLocaleString()}
        </div>
        <button className={styles.clearBtn} onClick={onClearItems}>
          <LuEraser /> 전체 지우기
        </button>
      </div>
    </div>
  )
}

export default SummaryBar