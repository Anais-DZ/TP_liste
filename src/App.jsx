import { Input } from './components/forms/Inputs.jsx';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Checkbox } from './components/forms/Checkbox.jsx';
import { ProductCategoryRow  } from './components/products/ProductCategoryRow.jsx';
import { ProductRow } from './components/products/ProductRow.jsx';



const PRODUCTS = [  
  {category: "Fruits", price: "1€", stocked: true, name: "Pomme"},  
  {category: "Fruits", price: "1€", stocked: true, name: "Fruit du dragon"},  
  {category: "Fruits", price: "2€", stocked: false, name: "Fruit de la passion"},  
  {category: "Légumes", price: "2€", stocked: true, name: "Épinards"},  
  {category: "Légumes", price: "4€", stocked: false, name: "Citrouille"},  
  {category: "Légumes", price: "1€", stocked: true, name: "Petits pois"}  
]


function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {

      return false
    }

    if (search && !product.name.includes(search)) {

      return false
    }

    return true
  })

  return <div className="container my-3">
    <SearchBar
    search={search}
    onSearchChange={setSearch} 
    showStockedOnly={showStockedOnly} 
    onStockedOnlyChange={setShowStockedOnly}/>

    <ProductTable products={visibleProducts}/>
  </div>


}

function SearchBar ({showStockedOnly, onStockedOnlyChange, search, onSearchChange}) {
  return <div>
    <div className="mb-3">
      <Input 
      value={search} 
      onChange={onSearchChange} 
      placeholder="Rechercher..."/>

      <Checkbox 
      id="stocked" 
      checked={showStockedOnly} 
      onChange={onStockedOnlyChange} 
      label="N'afficher que les produits en stock"/>
    </div>
  </div>
}


function ProductTable ({products}) {
  const rows = []
  let lastCategory = null

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRow key={product.name} product={product}/>)
  }

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>

}


export default App




