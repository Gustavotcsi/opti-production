import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import RawMaterialList from "./pages/RawMaterialList";
import RawMaterialForm from "./pages/RawMaterialForm";

function DashboardPlaceholder() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-gray-700">Production Dashboard</h2>
      <p className="text-gray-500 mt-2">Implementation coming in the next step!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas as rotas agora vivem dentro do Layout */}
        <Route element={<Layout />}>
          
          {/* Home agora é o Dashboard */}
          <Route path="/" element={<DashboardPlaceholder />} />

          {/* Rotas de Produtos */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />

          {/* Rotas de Matéria Prima */}
          <Route path="/raw-materials" element={<RawMaterialList />} />
          <Route path="/raw-materials/new" element={<RawMaterialForm />} />
          <Route path="/raw-materials/:id" element={<RawMaterialForm />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;