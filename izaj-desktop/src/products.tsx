// Products.tsx
import { useState } from 'react';
import { Icon } from '@iconify/react';

function Products() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-sm border-r flex flex-col h-full shrink-0 overflow-hidden`}>
        <div className="flex items-center gap-3 px-6 py-4">
          <img src="/izaj.jpg" alt="IZAJ Logo" className={`rounded-full bg-yellow-400 transition-all duration-300 ${sidebarCollapsed ? 'w-10 h-10' : 'w-10 h-10'}`} />
          {!sidebarCollapsed && (
            <h1 className="text-4xl font-regular text-gray-800" style={{ color: "#000000", fontFamily: "'Playfair Display', serif", textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)", letterSpacing: "10px" }}>
              IZAJ
            </h1>
          )}
        </div>
        <nav className={`${sidebarCollapsed ? 'p-2' : 'p-6'} flex-1`}>
          <ul className="space-y-2">
            {[
              { icon: 'mdi:view-dashboard', label: 'DASHBOARD', route: '/' },
              { icon: 'mdi:shopping-outline', label: 'PRODUCTS', route: '/products' },
              { icon: 'mdi:clipboard-list-outline', label: 'ORDERS', route: '/orders' },
              { icon: 'mdi:account-outline', label: 'USERS', route: '/user' },
              { icon: 'mdi:credit-card-outline', label: 'PAYMENTS', route: '/payments' },
              { icon: 'mdi:chart-bar', label: 'REPORTS', route: '/reports' },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.route}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2'} text-gray-800 hover:bg-gray-100 rounded-lg font-medium`}
                >
                  <Icon icon={item.icon} className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-800`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${sidebarCollapsed ? 'px-2' : 'px-6'} pb-6`}>
          <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3 mb-2' : 'gap-3 mb-4'} text-gray-600 hover:text-gray-800 w-full`}>
            <img src="/profile.webp" alt="Profile" className="w-8 h-8 rounded-full bg-gray-300" />
            {!sidebarCollapsed && <span className="text-sm font-medium">PROFILE</span>}
          </button>
          <button className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3'} text-gray-600 hover:text-gray-800 w-full`}>
            <Icon icon="mdi:cog-outline" className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-400`} />
            {!sidebarCollapsed && <span className="text-sm font-medium">SETTINGS</span>}
          </button>
        </div>
      </aside>

      {/* Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
       <header className={`bg-white shadow-lg border px-6 py-4 ${sidebarCollapsed ? 'mx-2' : 'mx-6'} mt-4 rounded-xl shrink-0 overflow-hidden`}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button className="p-2" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
      </button>
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
      Products
      <Icon icon="mdi:chevron-down" className="w-6 h-6 text-gray-600" />
    </h2>
    </div>
    <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold flex items-center gap-2">
      <Icon icon="mdi:plus" />
      Add Product
    </button>
  </div>
</header>


        {/* Main Content */}
        <main className={`flex-1 ${sidebarCollapsed ? 'px-4' : 'px-8'} py-6 bg-gray-50 overflow-auto`}>
  
        <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-4">
    <button className="text-black font-semibold border-b-2 border-black">All</button>
    <button className="text-gray-500 hover:text-black">Active</button>
    <button className="text-gray-500 hover:text-black">Draft</button>
    <button className="text-gray-500 hover:text-black">Archive</button>
  </div>
  <div className="flex items-center gap-2">
    <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg" />
    <select className="px-3 py-2 border rounded-lg text-sm">
      <option>Category</option>
    </select>
    <select className="px-3 py-2 border rounded-lg text-sm">
      <option>Type</option>
    </select>
    <button className="px-3 py-2 border rounded-lg text-sm">Advance Filter</button>
    
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{[
    {
        name: 'LED Surface Panel Light',
        category: 'Ceiling Light',
        price: '₱ 3,999',
        stock: 210,
        status: 'Active',
        variant: null,
        image: '/aber.webp'
    },
    {
        name: 'Plug in Pendant Light',
        category: 'Pendant Light',
        price: '₱ 1,999',
        stock: 16,
        status: 'Active',
        variant: 2,
        image: '/ceiling.jpg'
    },
    {
        name: 'Cluster Chandelier',
        category: 'Chandelier',
        price: '₱ 6,999',
        stock: 0,
        status: 'Out of Stock',
        variant: null,
        image: '/chadelier.jpg'
    },
    {
        name: 'Modern Chandelier Ceiling',
        category: 'Chandelier',
        price: '₱ 5,499',
        stock: 0,
        status: 'Out of Stock',
        variant: null,
        image: '/cluster.jpg'
    },
    {
        name: 'Kovacs 1 Light Arc Floor Lamp',
        category: 'Floor Light',
        price: '₱ 1,499',
        stock: 350,
        status: 'Active',
        variant: 4,
        image: '/floor.jpg'
    },
    {
        name: 'Progress Lightning Ceiling',
        category: 'Ceiling Light',
        price: '₱ 3,999',
        stock: 99,
        status: 'Active',
        variant: null,
        image: '/pendant.jpg'
    },
].map((product, idx) => (
    <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md border flex flex-col justify-between">
        <div className="mb-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-cover bg-gray-200 rounded mb-2"
            />
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            {product.status === 'Active' && (
                <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
            )}
            {product.status === 'Out of Stock' && (
                <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Out of Stock</span>
            )}
        </div>
        <div className="mt-auto">
            <p className="text-xl font-bold mb-2">{product.price}</p>
            <div className="flex items-center justify-between text-sm mb-2">
                <span className={`${product.stock === 0 ? 'text-red-600' : product.stock < 100 ? 'text-orange-500' : 'text-green-600'}`}>
                    {product.stock} Stock {product.stock === 0 ? '| Out' : product.stock < 100 ? '| Low' : '| High'}
                </span>
                {product.variant && <span className="text-gray-500">Variant ({product.variant})</span>}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-2">
                <div className={`h-full ${product.stock === 0 ? 'bg-red-400' : product.stock < 100 ? 'bg-orange-400' : 'bg-green-400'}`} style={{ width: `${Math.min(product.stock / 3.5, 100)}%` }}></div>
            </div>
            <button className="w-full py-2 rounded bg-black text-white font-semibold">RE-STOCK</button>
        </div>
    </div>
))}
</div>

        </main>
      </div>
    </div>
  );
}

export default Products;
