import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft, Package } from 'lucide-react';

// O ERRO ESTAVA AQUI: Tem que ter "export default" no começo!
export default function RawMaterialForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      api.get(`/raw-materials/${id}`)
        .then(res => {
          setName(res.data.name);
          setStock(res.data.stockQuantity);
        })
        .catch(() => navigate('/raw-materials'));
    }
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { name, stockQuantity: parseInt(stock) };

    try {
      if (isEditing) await api.put(`/raw-materials/${id}`, payload);
      else await api.post('/raw-materials', payload);
      navigate('/raw-materials');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving material.');
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/raw-materials')} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package /> {isEditing ? 'Edit Material' : 'New Material'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Material Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Ex: Wood, Screws, Plastic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Current Stock (Qty)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={() => navigate('/raw-materials')} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium">
            <Save size={18} /> Save Material
          </button>
        </div>
      </form>
    </div>
  );
}