import { useEffect, useState } from 'react';
import api from '../services/api';
import { TrendingUp, Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca o plano calculado pelo algoritmo do Java
  useEffect(() => {
    api.get('/products/planning')
      .then(response => {
        setPlan(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar planejamento:", error);
        setLoading(false);
      });
  }, []);

  // Cálculos de totais para os Cards
  const totalRevenue = plan.reduce((acc, item) => acc + item.totalValue, 0);
  const totalUnits = plan.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Calculating best production plan...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Production Plan 🚀</h1>
        <p className="text-gray-500">Optimized calculation based on current stock levels.</p>
      </div>

      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Faturamento Potencial */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Potential Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h3>
          </div>
        </div>

        {/* Card 2: Unidades a Produzir */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Units to Produce</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalUnits} un</h3>
          </div>
        </div>

        {/* Card 3: Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Algorithm Status</p>
            <h3 className="text-2xl font-bold text-gray-800">Optimized</h3>
          </div>
        </div>
      </div>

      {/* TABELA DO PLANO */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-700">Production Recommendation</h2>
        </div>
        
        {plan.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3 text-center">Quantity to Build</th>
                <th className="px-6 py-3 text-right">Estimated Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {plan.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.productName}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      {item.quantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-600 font-bold">
                    {item.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-10 text-center flex flex-col items-center gap-2">
            <AlertCircle size={40} className="text-yellow-500" />
            <p className="text-gray-600 font-medium">No production possible.</p>
            <p className="text-sm text-gray-400">Check if you have raw materials in stock or if products have recipes linked.</p>
          </div>
        )}
      </div>
    </div>
  );
}