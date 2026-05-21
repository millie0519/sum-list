import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ItemTable from './components/ItemTable'
import SummaryBar from './components/SummaryBar'
import Drawer from './components/Drawer'
import ListScreen from './components/ListScreen'
import SettingsSheet from './components/SettingsSheet'
import styles from './App.module.css'

const getDate = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

const defaultList = {
  id: Date.now(),
  name: '새 목록',
  items: [],
  updatedAt: getDate(),
  settings: {
    discount: false,
    vat: false,
    thousandSep: true,
    currency: 'KRW'
  }
}

function App() {
  const saved = localStorage.getItem('cartsum')
  const parsed = saved ? JSON.parse(saved) : null

  const [lists, setLists] = useState(parsed?.lists || [defaultList])
  const [currentListId, setCurrentListId] = useState(parsed?.currentListId || defaultList.id)
  const [view, setView] = useState(parsed?.view || 'table')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const currentList = lists.find(l => l.id === currentListId) || lists[0]
  const items = currentList.items

  useEffect(() => {
    localStorage.setItem('cartsum', JSON.stringify({ lists, currentListId, view }))
  }, [lists, currentListId, view])

  const updateItems = (newItems) => {
    setLists(lists.map(l =>
      l.id === currentListId ? { ...l, items: newItems, updatedAt: getDate() } : l
    ))
  }

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: '', quantity: 1, price: 0, discount: 0, vat: 0 }
    updateItems([...items, newItem])
  }

  const handleUpdateItem = (id, field, value) => {
    updateItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleDeleteItem = (id) => {
    updateItems(items.filter(item => item.id !== id))
  }

  const handleNewList = () => {
    const newList = {
      id: Date.now(),
      name: '새 목록',
      items: [],
      updatedAt: getDate(),
      settings: {
        discount: false,
        vat: false,
        thousandSep: true,
        currency: 'KRW'
      }
    }
    setLists([...lists, newList])
    setCurrentListId(newList.id)
    setView('table')
  }

  const handleUpdateSettings = (key, value) => {
    setLists(lists.map(l =>
      l.id === currentListId ? {
        ...l,
        settings: { ...l.settings, [key]: value }
      } : l
    ))
  }

  const handleRenameList = (name) => {
    setLists(lists.map(l =>
      l.id === currentListId ? { ...l, name } : l
    ))
  }

  const handleDeleteList = (id) => {
    const newLists = lists.filter(l => l.id !== id)
    if (newLists.length === 0) {
      const newList = { id: Date.now(), name: '새 목록', items: [], updatedAt: getDate() }
      setLists([newList])
      setCurrentListId(newList.id)
    } else {
      setLists(newLists)
      if (currentListId === id) setCurrentListId(newLists[0].id)
    }
  }

  const handleSelectList = (id) => {
    setCurrentListId(id)
    setView('table')
  }

  const handleClearItems = () => {
    if (window.confirm('목록을 모두 지울까요?')) {
      updateItems([])
    }
  }

  return (
    <div className={`${styles.app} ${view === 'table' ? styles.tableView : ''}`}>
      {view === 'list' ? (
        <ListScreen
          lists={lists}
          onSelectList={handleSelectList}
          onNewList={handleNewList}
          onDeleteList={handleDeleteList}
        />
      ) : (
        <>
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            lists={lists}
            currentListId={currentListId}
            onSelectList={handleSelectList}
            onNewList={handleNewList}
            onGoToList={() => setView('list')}
          />
          <Header
            listName={currentList.name}
            itemCount={items.length}
            onNewList={handleNewList}
            onRenameList={handleRenameList}
            onMenuClick={() => setDrawerOpen(true)}
            onSettingsClick={() => setSettingsOpen(true)}
          />
          <ItemTable
             items={items}
             onAddItem={handleAddItem}
             onUpdateItem={handleUpdateItem}
             onDeleteItem={handleDeleteItem}
             settings={currentList.settings}
          />
          <SummaryBar items={items} onClearItems={handleClearItems} settings={currentList.settings} />
          <SettingsSheet
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            settings={currentList.settings}
            onUpdateSettings={handleUpdateSettings}
          />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App