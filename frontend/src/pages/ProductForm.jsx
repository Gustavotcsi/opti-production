import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft } from 'lucide-react';

export default function ProductForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    const payload = {
      name,
      sellingPrice: parseFloat(price) // Converte texto para número decimal
    };

    try {
      await api.post('/products', payload);
      alert('Product created successfully!');
      navigate('/'); // Volta para a listagem
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Check console.');
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Ex: Gaming Chair"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={18} />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}