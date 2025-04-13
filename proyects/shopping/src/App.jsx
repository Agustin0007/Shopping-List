import { useState, useEffect } from 'react' // Importamos los hooks necesarios
import { ShoppingForm } from './components/ShoppingForm'
import { ShoppingList } from './components/ShoppingList'
import { ShoppingHeader } from './components/ShoppingHeader'
import './App.css'

export function App() {
  // Estado principal para almacenar todos los items de la lista
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('shoppingItems')
    return savedItems ? JSON.parse(savedItems) : []
  })
  
  // Efecto para guardar los items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(items))
  }, [items])

  // Función para agregar un nuevo item a la lista
  const addItem = (newItem) => {
    setItems(prevItems => [...prevItems, { ...newItem, id: Date.now() }])
    // Usa Date.now() como ID único temporal
  }

  // Función para eliminar un item de la lista por su ID
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
    // Filtra y mantiene solo los items que no coinciden con el ID
  }

  // Función para editar un item existente
  const editItem = (id, updatedItem) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ))
    // Actualiza el item específico manteniendo su ID
  }

  // Función para marcar un item como completado y reordenar la lista
  const toggleComplete = (id) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    // Reordena: items no completados primero, completados al final
    const uncompleted = newItems.filter(item => !item.completed)
    const completed = newItems.filter(item => item.completed)
    setItems([...uncompleted, ...completed])
  }

  return (
    <div className="shopping-app">
      <ShoppingHeader /> {/* Renderiza el encabezado */}
      <ShoppingForm onAddItem={addItem} /> {/* Formulario para agregar items */}
      <ShoppingList 
        items={items}
        onDelete={deleteItem}
        onEdit={editItem}
        onToggleComplete={toggleComplete}
      /> {/* Lista de items con todas las funciones necesarias */}
    </div>
  )
}