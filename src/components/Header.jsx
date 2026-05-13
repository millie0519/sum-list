import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <button className={styles.menuBtn} aria-label="메뉴">≡</button>
      <div>
        <div className={styles.title}>장보기</div>
        <div className={styles.subtitle}>5월 13일</div>
      </div>
      <div className={styles.right}>
        <button className={styles.settingBtn} aria-label="설정">⚙</button>
      </div>
    </header>
  )
}

export default Header