import styles from './Drawer.module.css'

function Drawer({ isOpen, onClose, lists, currentListId, onSelectList, onNewList, onGoToList }) {
  const recentLists = [...lists].reverse().slice(0, 5)

  return (
    <>
      {isOpen && <div className={styles.dim} onClick={onClose} />}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>목록</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <button className={styles.newListBtn} onClick={() => { onNewList(); onClose(); }}>
          + 새 목록
        </button>

        <button className={styles.goToListBtn} onClick={() => { onGoToList(); onClose(); }}>
          📋 목록 전체보기
        </button>

        <div className={styles.divider} />

        <div className={styles.listWrap}>
          {recentLists.map(list => (
            <div
              key={list.id}
              className={`${styles.listItem} ${list.id === currentListId ? styles.active : ''}`}
              onClick={() => { onSelectList(list.id); onClose(); }}
            >
              <span className={styles.listName}>{list.name}</span>
              <span className={styles.listCount}>{list.items.length}개</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Drawer