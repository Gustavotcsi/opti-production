import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams para pegar o ID
import api from '../services/api';
import { Save, ArrowLeft } from 'lucide-react';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL (se existir)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Se tiver ID, busca os dados do produto para preencher o formulário
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      api.get(`/products/${id}`) // Precisamos criar esse endpoint no Java? O Quarkus Panache já dá ele de graça!
        .then(response => {
          setName(response.data.name);
          setPrice(response.data.sellingPrice);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
          alert("Product not found!");
          navigate('/');
        });
    }
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    const payload = {
      name,
      sellingPrice: parseFloat(price)
    };

    try {
      if (isEditing) {
        // MODO EDIÇÃO (PUT)
        await api.put(`/products/${id}`, payload);
        alert('Product updated successfully! 🔄');
      } else {
        // MODO CRIAÇÃO (POST)
        await api.post('/products', payload);
        alert('Product created successfully! 🎉');
      }
      navigate('/'); 
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Check console.');
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        {/* Título muda dinamicamente */}
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Product' : 'New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Selling Price (R$)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            {isEditing ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}