import { useState } from 'react' // Importamos el hook useState para manejar el estado local

// Componente de formulario que recibe la función onAddItem como prop para agregar items
export function ShoppingForm({ onAddItem }) {
  // Estado para el nombre del nuevo item
  const [newItem, setNewItem] = useState('')
  // Estado para la cantidad del nuevo item, iniciando en 1
  const [quantity, setQuantity] = useState(1)

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario
    if (!newItem.trim()) return // Validación: si el item está vacío, no hace nada
    
    // Llama a la función padre para agregar el nuevo item
    onAddItem({ name: newItem, quantity, completed: false })
    // Resetea los campos del formulario
    setNewItem('')
    setQuantity(1)
  }

  return (
    <form className="shopping-form" onSubmit={handleSubmit}>
      {/* Contenedor del input para el nombre del item */}
      <div className="input-wrapper-lapiz">
        <i className="fas fa-pencil"></i>
        <input
          className="item-input"
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
        />
      </div>
      {/* Contenedor del input para la cantidad */}
      <div className="input-wrapper-cant">
        <i className="fas fa-hashtag"></i>
        <input
          className="quantity-input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          placeholder="Qty"
        />
      </div>
      {/* Botón para enviar el formulario */}
      <button className="add-button" type="submit">
        <i className="fas fa-plus"></i>
        Add Item
      </button>
    </form>
  )
}