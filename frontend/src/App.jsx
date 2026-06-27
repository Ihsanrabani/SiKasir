import './index.css';
import Token from './Page/Token';
import AddOrder from './Page/AddOrder';
import AddProduct from './Page/AddProduct';
import EditProduct from './Page/EditProduct';
import ListProduct from './Page/ListProduct';
import KitchenDisplay from './Page/KitchenDisplay';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/token' element={<Token/>}/>
          <Route path='/' element={<AddOrder/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/edit-product/:id' element={<EditProduct/>}/>
          <Route path='/list-product' element={<ListProduct/>}/>
          <Route path='/kitchen-display' element={<KitchenDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
