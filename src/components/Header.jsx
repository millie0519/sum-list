import { useState } from 'react'
import styles from './Header.module.css'

function Header({ listName, itemCount, onNewList, onRenameList, onMenuClick, onSettingsClick }) {
  const [editing, setEditing] = useState(false)
  const [tempName, setTempName] = useState(listName)

  const handleBlur = () => {
    setEditing(false)
    onRenameList(tempName || '새 목록')
  }

  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="메뉴">
        <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <line x1="3" y1="6"  x2="23" y2="6"  stroke="#333" stroke-width="2" stroke-linecap="round"/>
          <line x1="3" y1="13"   x2="23" y2="13"   stroke="#333" stroke-width="2" stroke-linecap="round"/>
          <line x1="3" y1="20" x2="23" y2="20" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div>
        {editing ? (
          <input
            className={styles.titleInput}
            value={tempName} 
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
          />
        ) : (
          <div className={styles.title} onClick={() => {
            setTempName(listName)
            setEditing(true)
          }}>
            {listName}
          </div>
        )}
        <div className={styles.subtitle}>{itemCount}개 품목</div>
      </div>
      <div className={styles.right}>
        <button className={styles.newListBtn} onClick={onNewList} aria-label="새 목록">+</button>
        <button className={styles.settingBtn} onClick={onSettingsClick} aria-label="설정">
          <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.05 3.5a2 2 0 0 1 3.9 0l.18.67a1.3 1.3 0 0 0 1.95.78l.6-.35a2 2 0 0 1 2.76 2.76l-.35.6a1.3 1.3 0 0 0 .78 1.95l.67.18a2 2 0 0 1 0 3.9l-.67.18a1.3 1.3 0 0 0-.78 1.95l.35.6a2 2 0 0 1-2.76 2.76l-.6-.35a1.3 1.3 0 0 0-1.95.78l-.18.67a2 2 0 0 1-3.9 0l-.18-.67a1.3 1.3 0 0 0-1.95-.78l-.6.35a2 2 0 0 1-2.76-2.76l.35-.6a1.3 1.3 0 0 0-.78-1.95l-.67-.18a2 2 0 0 1 0-3.9l.67-.18a1.3 1.3 0 0 0 .78-1.95l-.35-.6A2 2 0 0 1 8.32 4.6l.6.35a1.3 1.3 0 0 0 1.95-.78l.18-.67z"
              fill="none" stroke="#333" stroke-width="1.6" stroke-linejoin="round"/>
            <circle cx="13" cy="12" r="3.5" fill="none" stroke="#333" stroke-width="1.6"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header