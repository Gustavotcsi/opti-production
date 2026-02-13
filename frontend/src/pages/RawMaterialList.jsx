import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Trash2, Edit, Plus, Package } from 'lucide-react';

export default function RawMaterialList() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    loadMaterials();
  }, []);

  function loadMaterials() {
    api.get('/raw-materials')
      .then(response => setMaterials(response.data))
      .catch(error => console.error("Error fetching materials:", error));
  }

  async function handleDelete(id) {
    if (confirm('Delete this material?')) {
      try {
        await api.delete(`/raw-materials/${id}`);
        loadMaterials();
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Failed to delete material.');
      }
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="text-blue-600" />
          Raw Materials Stock
        </h1>
        <button 
          onClick={() => navigate('/raw-materials/new')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Material Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {materials.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.stockQuantity} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                  <button onClick={() => navigate(`/raw-materials/${item.id}`)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {materials.length === 0 && (
              <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No materials found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Botão temporário para voltar aos produtos */}
      <div className="mt-6 text-center">
        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 underline">
          Go back to Products
        </button>
      </div>
    </div>
  );
}