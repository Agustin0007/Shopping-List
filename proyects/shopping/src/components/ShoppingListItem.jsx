import { useState } from 'react' // Importamos useState para manejar el estado de edición

// Componente que representa un item individual de la lista
export function ShoppingListItem({ item, onDelete, onEdit, onToggleComplete }) {
  // Estado para controlar si el item está en modo edición
  const [isEditing, setIsEditing] = useState(false)
  // Estados para los valores temporales durante la edición
  const [editValue, setEditValue] = useState(item.name)
  const [editQuantity, setEditQuantity] = useState(item.quantity)

  // Función para guardar los cambios de la edición
  const handleSave = () => {
    onEdit(item.id, { name: editValue, quantity: editQuantity })
    setIsEditing(false) // Sale del modo edición
  }

  // Renderizado condicional basado en si está en modo edición
  return (
    <div className={`list-item ${item.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // Formulario de edición
        <div className="edit-mode">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(Number(e.target.value))}
            min="1"
          />
          <button className="save-button" onClick={handleSave}>
            <i className="fas fa-check"></i>
            Save
          </button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            <i className="fas fa-times"></i>
            Cancel
          </button>
        </div>
      ) : (
        // Vista normal del item
        <>
          <div className="item-content">
            <i className="fas fa-shopping-cart item-icon"></i>
            <span className="item-text">{item.name}</span>
            <span className="item-quantity">
              <i className="fas fa-times"></i>
              {item.quantity}
            </span>
          </div>
          <div className="item-actions">
            <button 
              className="action-button complete-button"
              onClick={() => onToggleComplete(item.id)}
            >
              <i className="fas fa-check"></i>
            </button>
            <button 
              className="action-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-pen"></i>
            </button>
            <button 
              className="action-button delete-button"
              onClick={() => onDelete(item.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </div>
  )
}