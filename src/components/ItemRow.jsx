import styles from './ItemRow.module.css'

function ItemRow({ item, index, onUpdateItem, onDeleteItem, settings }) {
  const fmt = (num) => {
    const sep = settings?.thousandSep ?? true
    const fixed = Number(num.toFixed(2))
    return sep ? fixed.toLocaleString() : String(fixed)
  }

  const calcAmount = () => {
    let amt = item.price * item.quantity
    if (settings?.discount) amt *= (1 - (item.discount || 0) / 100)
    if (settings?.vat) amt *= (1 + (item.vat || 0) / 100)
    return amt
  }

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
      {settings?.discount && (
        <td>
          <input
            className={styles.input}
            type="text"
            value={item.discount ? `${item.discount}%` : ''}
            onChange={(e) => {
              const val = e.target.value.replace('%', '').replace(/[^0-9.]/g, '')
              onUpdateItem(item.id, 'discount', Number(val) || 0)
            }}
            onFocus={(e) => {
              e.target.value = item.discount || ''
            }}
            onBlur={(e) => {
              if (item.discount) e.target.value = `${item.discount}%`
            }}
            placeholder="0%"
          />
        </td>
      )}
      {settings?.vat && (
        <td>
          <input
            className={styles.input}
            type="text"
            value={item.vat ? `${item.vat}%` : ''}
            onChange={(e) => {
              const val = e.target.value.replace('%', '').replace(/[^0-9.]/g, '')
              onUpdateItem(item.id, 'vat', Number(val) || 0)
            }}
            onFocus={(e) => {
              e.target.value = item.vat || ''
            }}
            onBlur={(e) => {
              if (item.vat) e.target.value = `${item.vat}%`
            }}
            placeholder="0%"
          />
        </td>
      )}
      <td>
        {fmt(calcAmount())}
        <button className={styles.deleteBtn} onClick={() => onDeleteItem(item.id)} aria-label="삭제">×</button>
      </td>
    </tr>
  )
}

export default ItemRow