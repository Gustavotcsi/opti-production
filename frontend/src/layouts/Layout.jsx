import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Fixo na Esquerda */}
      <Sidebar />
      
      {/* Conteúdo Variável na Direita */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet /> 
        {/* O Outlet é onde o React Router joga o conteúdo da página atual (Produtos, Matérias, etc) */}
      </main>
    </div>
  );
}