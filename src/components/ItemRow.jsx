import { useState, useEffect } from 'react'
import styles from './ItemRow.module.css'
import { GrFormClose } from "react-icons/gr"

function ItemRow({ item, index, onUpdateItem, onDeleteItem, settings }) {
  const [swiped, setSwiped] = useState(false)
  const [startX, setStartX] = useState(0)

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

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - startX
    if (deltaX < -44) {
      setSwiped(true)
    } else {
      setSwiped(false)
    }
  }

  useEffect(() => {
    if (!swiped) return
  
    const handleTouch = () => setSwiped(false)
    window.addEventListener('touchstart', handleTouch)
    return () => window.removeEventListener('touchstart', handleTouch)
  }, [swiped])

  return (
    <tr
      className={styles.row}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
          onFocus={(e) => e.target.select()}
          placeholder="단가"
        />
      </td>
      <td>
        <input
          className={styles.input}
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
          onFocus={(e) => e.target.select()}
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
            onFocus={(e) => { e.target.value = item.discount || '' }}
            onBlur={(e) => { if (item.discount) e.target.value = `${item.discount}%` }}
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
            onFocus={(e) => { e.target.value = item.vat || '' }}
            onBlur={(e) => { if (item.vat) e.target.value = `${item.vat}%` }}
            placeholder="0%"
          />
        </td>
      )}
      <td style={{ position: 'relative', overflow: 'hidden' }}>
        {fmt(calcAmount())}
        <button
          className={`${styles.swipeDeleteBtn} ${swiped ? styles.swipeDeleteBtnVisible : ''}`}
          onClick={() => onDeleteItem(item.id)}
          aria-label="삭제"
        >
          <GrFormClose />
        </button>
        <button className={styles.deleteBtn} onClick={() => onDeleteItem(item.id)} aria-label="삭제">
          <GrFormClose />
        </button>
      </td>
    </tr>
  )
}

export default ItemRow