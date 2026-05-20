import styles from './SettingsSheet.module.css'
import { CURRENCIES } from '../constants'

function Toggle({ on, onChange }) {
  return (
    <button
      className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
    >
      <span className={styles.toggleKnob} />
    </button>
  )
}

function SettingsSheet({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!settings) return null

  return (
    <>
      {isOpen && <div className={styles.dim} onClick={onClose} />}
      <div className={`${styles.sheet} ${isOpen ? styles.open : ''}`}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <span className={styles.title}>표 설정</span>
          <button className={styles.doneBtn} onClick={onClose}>완료</button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>통화</div>
                <div className={styles.rowDesc}>가격 앞에 표시할 단위</div>
              </div>
              <select
                className={styles.select}
                value={settings.currency}
                onChange={(e) => onUpdateSettings('currency', e.target.value)}
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} · {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.sectionLabel}>추가 컬럼</div>
          <div className={styles.section}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>할인율</div>
                <div className={styles.rowDesc}>단가에서 차감되는 비율</div>
              </div>
              <Toggle on={settings.discount} onChange={(v) => onUpdateSettings('discount', v)} />
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>부가세율</div>
                <div className={styles.rowDesc}>단가에 가산되는 비율</div>
              </div>
              <Toggle on={settings.vat} onChange={(v) => onUpdateSettings('vat', v)} />
            </div>
          </div>

          <div className={styles.sectionLabel}>표시</div>
          <div className={styles.section}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>천 단위 구분</div>
                <div className={styles.rowDesc}>숫자에 쉼표 표시</div>
              </div>
              <Toggle on={settings.thousandSep} onChange={(v) => onUpdateSettings('thousandSep', v)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsSheet