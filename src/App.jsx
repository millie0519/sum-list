import { useState, useEffect } from 'react'
import Header from './components/Header'
import ItemTable from './components/ItemTable'
import SummaryBar from './components/SummaryBar'
import styles from './App.module.css'

function App() {
  const savedItems = localStorage.getItem('items')
  const [items, setItems] = useState(savedItems ? JSON.parse(savedItems) : [
    { id: 1, name: '계란', quantity: 1, price: 7900 },
    { id: 2, name: '우유', quantity: 2, price: 2800 },
    { id: 3, name: '두부', quantity: 3, price: 1500 },
  ])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      quantity: 1,
      price: 0,
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className={styles.app}>
      <Header />
      <ItemTable
        items={items}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
      <SummaryBar items={items} />
    </div>
  )
}

export default App