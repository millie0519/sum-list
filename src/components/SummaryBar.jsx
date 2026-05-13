import Footer from './Footer'
import styles from './SummaryBar.module.css'

function SummaryBar({ items }) {
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
        <button className={styles.saveBtn}>저장</button>
      </div>
      <Footer />
    </div>
  )
}

export default SummaryBar