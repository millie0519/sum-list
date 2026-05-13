import styles from './ItemRow.module.css'

function ItemRow({ item, index, onUpdateItem, onDeleteItem }) {
  return (
    <tr className={styles.row}>
      <td>{index + 1}</td>
      <td>
        <input
          className={`${styles.input} ${styles.inputLeft}`}
          value={item.name}
          onChange={(e) => onUpdateItem(item.id, 'name', e.target.value)}
          placeholder="품목 입력…"
        />
      </td>
      <td>
        <input
          className={styles.input}
          type="number"
          value={item.price}
          onChange={(e) => onUpdateItem(item.id, 'price', Number(e.target.value))}
          placeholder="단가"
        />
      </td>
      <td>
        <input
          className={styles.input}
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
          placeholder="수량"
        />
      </td>
      <td>
        {(item.price * item.quantity).toLocaleString()}
        <button className={styles.deleteBtn} onClick={() => onDeleteItem(item.id)} aria-label="삭제">×</button>
      </td>
    </tr>
  )
}

export default ItemRow