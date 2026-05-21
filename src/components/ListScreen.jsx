import styles from './ListScreen.module.css'
import { CURRENCIES } from '../constants'
import { BsTrash3 } from "react-icons/bs";

function ListScreen({ lists, onSelectList, onNewList, onDeleteList }) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>내 목록</h1>
        <button className={styles.newBtn} onClick={onNewList}>+ 새 목록</button>
      </div>

      <div className={styles.listWrap}>
        {lists.length === 0 ? (
          <div className={styles.empty}>
            <p>저장된 목록이 없어요</p>
            <p>새 목록을 만들어봐요!</p>
          </div>
        ) : (
          lists.map(list => {
            const currency = CURRENCIES.find(c => c.code === (list.settings?.currency ?? 'KRW'))
            return (
              <div key={list.id} className={styles.card} onClick={() => onSelectList(list.id)}>
                <div className={styles.cardMain}>
                  <span className={styles.listName}>{list.name}</span>
                  <span className={styles.listCount}>
                    {list.items.length}개 품목 · {list.updatedAt || '날짜 없음'}
                  </span>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.listTotal}>
                    {currency?.symbol}{list.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                  </span>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (window.confirm(`'${list.name}'을 삭제하시겠습니까?`)) {
                        onDeleteList(list.id)
                      }
                    }}
                  >
                    <BsTrash3 />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ListScreen