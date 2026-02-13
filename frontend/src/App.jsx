import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;