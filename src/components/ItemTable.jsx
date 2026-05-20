import styles from './ItemTable.module.css'
import ItemRow from './ItemRow'

function ItemTable({ items, onAddItem, onUpdateItem, onDeleteItem, settings }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>품목</th>
            <th>단가</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemRow
              key={item.id}
              item={item}
              index={index}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
              settings={settings}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.addRow}>
        <button className={styles.addBtn} onClick={onAddItem} aria-label="행 추가">
          <span className={styles.addBtnIcon}>+</span>
          행 추가
        </button>
        <span className={styles.addHint}>탭하여 입력</span>
      </div>
      <div className={styles.caption}>금액 = 단가 × 수량</div>
    </div>
  )
}

export default ItemTable