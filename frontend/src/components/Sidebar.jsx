import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Box, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/', label: 'Production Plan', icon: <LayoutDashboard size={20} /> }, 
    { path: '/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/raw-materials', label: 'Raw Materials', icon: <Box size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          OptiFlex
        </h1>
        <p className="text-xs text-gray-500 mt-1">Production Manager</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors w-full">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}