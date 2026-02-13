import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
 
  const [composition, setComposition] = useState([]); 
  const [materialsList, setMaterialsList] = useState([]); 
  
 
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [qtyInput, setQtyInput] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    
    api.get('/raw-materials')
      .then(res => setMaterialsList(res.data))
      .catch(err => console.error("Error loading materials", err));

    
    if (id) {
      setIsEditing(true);
      api.get(`/products/${id}`)
        .then(response => {
          setName(response.data.name);
          setPrice(response.data.sellingPrice);
          // O backend retorna "composition", vamos jogar no estado
          setComposition(response.data.composition || []); 
        })
        .catch(error => {
          console.error("Error fetching product:", error);
          navigate('/products');
        });
    }
  }, [id, navigate]);

  
  function handleAddIngredient() {
    if (!selectedMaterialId || !qtyInput) return alert("Select a material and quantity!");

    const materialObj = materialsList.find(m => m.id === parseInt(selectedMaterialId));

   
    const newItem = {
      rawMaterial: materialObj,
      requiredQuantity: parseInt(qtyInput)
    };

    
    setComposition([...composition, newItem]);
    setSelectedMaterialId('');
    setQtyInput('');
  }

  
  function handleRemoveIngredient(indexToRemove) {
    setComposition(composition.filter((_, index) => index !== indexToRemove));
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const payload = {
      name,
      sellingPrice: parseFloat(price),
      composition: composition 
    };

    try {
      if (isEditing) {
        await api.put(`/products/${id}`, payload);
        alert('Product updated successfully!');
      } else {
        await api.post('/products', payload);
        alert('Product created successfully!');
      }
      navigate('/products'); 
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product.');
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Product' : 'New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* BLOCO 1: Informações Básicas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Selling Price (R$)</label>
              <input
                type="number" step="0.01"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* BLOCO 2: Composição (Receita) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Composition (Recipe)</h2>
          
          {/* Inputs para adicionar Ingrediente */}
          <div className="flex gap-2 items-end mb-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Raw Material</label>
              <select 
                className="w-full border border-gray-300 rounded p-2"
                value={selectedMaterialId}
                onChange={e => setSelectedMaterialId(e.target.value)}
              >
                <option value="">Select Material...</option>
                {materialsList.map(mat => (
                  <option key={mat.id} value={mat.id}>{mat.name} (Stock: {mat.stockQuantity})</option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <label className="block text-xs font-bold text-gray-500 mb-1">Qty Required</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded p-2"
                placeholder="0"
                value={qtyInput}
                onChange={e => setQtyInput(e.target.value)}
              />
            </div>
            <button 
              type="button"
              onClick={handleAddIngredient}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex items-center gap-1 h-[42px]"
            >
              <Plus size={18} /> Add
            </button>
          </div>

          {/* Lista de Ingredientes Adicionados */}
          {composition.length > 0 ? (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Material</th>
                  <th className="p-2 text-center">Required Qty</th>
                  <th className="p-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {composition.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.rawMaterial?.name}</td>
                    <td className="p-2 text-center font-bold">{item.requiredQuantity}</td>
                    <td className="p-2 text-right">
                      <button 
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center py-4 italic">No materials added to this product yet.</p>
          )}
        </div>

        {/* Botão Salvar Geral */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center gap-2 shadow-lg"
          >
            <Save size={20} />
            Save Product & Recipe
          </button>
        </div>
      </form>
    </div>
  );
}