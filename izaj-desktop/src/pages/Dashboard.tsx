import { Icon } from '@iconify/react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';

interface DashboardProps {
  session: Session | null;
}

const Dashboard = ({session}: DashboardProps ) => {

  console.log('Dashboard session:', session?.user.id);
  
  const [salesExpanded, setSalesExpanded] = useState(false);
  const [cardOrder, setCardOrder] = useState(['customer', 'order', 'earning']);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(cardOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCardOrder(items);
  };

  return (
    <div className="flex-1 flex flex-col h-0">
      <main
        className="flex-1 px-8 py-8 bg-white
          scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-100 transition-all duration-300 rounded-3xl mb-8"
        style={{
          minHeight: 0,
          boxShadow: '0 4px 32px 0 rgba(252, 211, 77, 0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-10 pb-8">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-8">
            <Icon icon="mdi:view-dashboard" className="text-yellow-400 w-8 h-8" />
            Dashboard
          </h2>

          {/* Top Row - Stats Cards */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable 
            droppableId="stats-cards" 
            direction="horizontal" 
            isDropDisabled={false} 
            isCombineEnabled={false}
            ignoreContainerClipping={false}  
            >
              {(provided) => (
                <div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cardOrder.map((cardId, index) => {
                    switch (cardId) {
                      case 'customer':
                        return (
                          <Draggable key="customer" draggableId="customer" index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-yellow-400 cursor-move
                                  ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''}`}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Customer</h3>
                                    <p className="text-gray-500 text-sm">Customers feedback</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center mb-6">
                                  <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                                      <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                                      <circle 
                                        cx="64" 
                                        cy="64" 
                                        r="56" 
                                        stroke="#3b82f6" 
                                        strokeWidth="8" 
                                        fill="none" 
                                        strokeDasharray="351" 
                                        strokeDashoffset="70" 
                                        strokeLinecap="round" 
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                      <span className="text-3xl font-bold text-gray-800">345</span>
                                      <span className="text-gray-500 text-sm">Total</span>
                                    </div>
                                  </div>
                                </div>
                                <button className="text-orange-500 text-sm font-medium hover:text-orange-600">View All</button>
                              </div>
                            )}
                          </Draggable>
                        );
                      case 'order':
                        return (
                          <Draggable key="order" draggableId="order" index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-2xl shadow-lg border-l-4 border-blue-200 p-6 transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-blue-400 cursor-move
                                  ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''}`}
                              >
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <span>
                                        <Icon icon="mdi:circle" className="w-3 h-3 text-gray-300" />
                                      </span>
                                      <span className="text-sm text-gray-600">Pending</span>
                                    </div>
                                    <span className="font-semibold text-gray-800">345</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <span>
                                        <Icon icon="mdi:circle" className="w-3 h-3 text-blue-400" />
                                      </span>
                                      <span className="text-sm text-gray-600">Shipped</span>
                                    </div>
                                    <span className="font-semibold text-gray-800">123</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <span>
                                        <Icon icon="mdi:circle" className="w-3 h-3 text-green-400" />
                                      </span>
                                      <span className="text-sm text-gray-600">Delivered</span>
                                    </div>
                                    <span className="font-semibold text-gray-800">97</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <span>
                                        <Icon icon="mdi:circle" className="w-3 h-3 text-red-400" />
                                      </span>
                                      <span className="text-sm text-gray-600">Cancelled</span>
                                    </div>
                                    <span className="font-semibold text-gray-800">23</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      case 'earning':
                        return (
                          <Draggable key="earning" draggableId="earning" index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-2xl shadow-lg border-l-4 border-green-200 p-6 transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl hover:border-green-400 cursor-move
                                  ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''}`}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <h3 className="text-lg font-semibold text-gray-800">Earning</h3>
                                  <select className="text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer">
                                    <option>Monthly Invoice</option>
                                  </select>
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                  <span className="text-2xl font-bold text-gray-800">₱ 49.9k</span>
                                  <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">+2.1%</span>
                                </div>
                                <div className="h-20 bg-gray-50 rounded-lg flex items-end justify-center gap-1 p-3">
                                  {Array.from({length: 12}).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`w-2 bg-blue-200 rounded-sm transition-all duration-300 ${
                                        i === 11 ? 'h-16 bg-blue-500' : 
                                        i === 10 ? 'h-12 bg-blue-400' : 
                                        i === 9 ? 'h-8 bg-blue-300' : 'h-6'
                                      }`}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      default:
                        return null;
                    }
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Bottom Row Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Sales Report Container */}
            <div className="lg:col-span-2">
              <div
                className={`bg-white rounded-2xl shadow-lg border-l-4 border-indigo-200 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-indigo-400 cursor-pointer
                  ${salesExpanded ? 'h-auto' : 'h-[400px]'}
                `}
                onClick={() => setSalesExpanded((prev) => !prev)}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Icon icon="mdi:chart-line" className="text-indigo-400 w-6 h-6" />
                  <h3 className="text-lg font-semibold text-gray-800">Sales Report</h3>
                  <select className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white">
                    <option>Year (2023)</option>
                  </select>
                  <span className="ml-auto">
                    <Icon
                      icon={salesExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                      className="w-6 h-6 text-gray-400"
                    />
                  </span>
                </div>
                <div className="h-72 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 240">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      points="0,200 50,180 100,150 150,140 200,160 250,120 300,100 350,90 400,60 450,40 500,20"
                    />
                    <polygon
                      fill="url(#gradient)"
                      points="0,200 50,180 100,150 150,140 200,160 250,120 300,100 350,90 400,60 450,40 500,20 500,240 0,240"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-4">
                    <span>January</span>
                    <span>March</span>
                    <span>May</span>
                    <span>July</span>
                    <span>September</span>
                    <span>November</span>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-4">
                    <span>600k</span>
                    <span>400k</span>
                    <span>200k</span>
                    <span>0</span>
                  </div>
                </div>
                {/* Expanded content */}
                {salesExpanded && (
                  <div className="mt-8 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                        <span className="text-2xl font-bold text-indigo-600">₱ 1.2M</span>
                        <span className="text-xs text-gray-500 mt-1">Total Sales</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                        <span className="text-2xl font-bold text-indigo-600">+8.5%</span>
                        <span className="text-xs text-gray-500 mt-1">Growth Rate</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                        <span className="text-2xl font-bold text-indigo-600">1,234</span>
                        <span className="text-xs text-gray-500 mt-1">Transactions</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Monthly Breakdown</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                          <thead>
                            <tr>
                              <th className="px-3 py-2 text-left">Month</th>
                              <th className="px-3 py-2 text-left">Sales</th>
                              <th className="px-3 py-2 text-left">Orders</th>
                              <th className="px-3 py-2 text-left">Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-3 py-2">January</td>
                              <td className="px-3 py-2">₱ 100k</td>
                              <td className="px-3 py-2">120</td>
                              <td className="px-3 py-2 text-green-600">+2.5%</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">February</td>
                              <td className="px-3 py-2">₱ 110k</td>
                              <td className="px-3 py-2">130</td>
                              <td className="px-3 py-2 text-green-600">+3.1%</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">March</td>
                              <td className="px-3 py-2">₱ 95k</td>
                              <td className="px-3 py-2">110</td>
                              <td className="px-3 py-2 text-red-600">-1.8%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Best Selling Container */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-l-4 border-pink-200 p-6 transition-transform duration-200 hover:scale-[1.01] hover:shadow-2xl hover:border-pink-400 h-[400px]">
                <div className="flex items-center gap-2 mb-6">
                  <Icon icon="mdi:star" className="text-pink-400 w-6 h-6" />
                  <h3 className="text-lg font-semibold text-gray-800">Best Selling</h3>
                  <select className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white">
                    <option>Lightning</option>
                  </select>
                </div>
                <div className="space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
                  {[
                    { name: 'Ceiling Light', reviews: '456 Review', rating: 5 },
                    { name: 'Chandelier', reviews: '357 Review', rating: 5 },
                    { name: 'Cluster Chandelier', reviews: '365 Review', rating: 5 },
                    { name: 'Pendant Light', reviews: '589 Review', rating: 5 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Icon icon="mdi:lightbulb-outline" className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.reviews}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({length: 5}).map((_, i) => (
                          <Icon 
                            key={i} 
                            icon="mdi:star"
                            className={`w-3 h-3 ${
                              i < item.rating 
                                ? 'text-yellow-400' 
                                : 'text-gray-200'
                            }`} 
                            style={{ fill: i < item.rating ? '#facc15' : '#e5e7eb' }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 