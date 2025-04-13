import { ShoppingListItem } from './ShoppingListItem' // Importamos el componente para cada item

// Componente que renderiza la lista de items
export function ShoppingList({ items, onDelete, onEdit, onToggleComplete }) {
  return (
    <div className="shopping-list">
      {/* Mapea cada item a un componente ShoppingListItem */}
      {items.map(item => (
        <ShoppingListItem
          key={item.id} // Key única para React
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}