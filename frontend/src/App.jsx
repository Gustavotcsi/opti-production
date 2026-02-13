import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import RawMaterialList from "./pages/RawMaterialList"; // <--- NOVO
import RawMaterialForm from "./pages/RawMaterialForm"; // <--- NOVO

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Routes>
          {/* Rotas de Produto */}
          <Route path="/" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />

          {/* Rotas de Matéria Prima (NOVAS) */}
          <Route path="/raw-materials" element={<RawMaterialList />} />
          <Route path="/raw-materials/new" element={<RawMaterialForm />} />
          <Route path="/raw-materials/:id" element={<RawMaterialForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;