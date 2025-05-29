// Products.tsx
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

interface SalesData {
  totalRevenue: number;
  bestProduct: string;
  bestCategory: string;
  salesTrend: number[];
  websiteVisits: number;
  stockLevel: number;
  topProducts: string[];
}

// Mock data for demonstration
const mockSalesData: Record<string, SalesData> = {
  '2023': {
    totalRevenue: 1111111,
    bestProduct: 'Plug In Pendant Light',
    bestCategory: 'Pendant Light',
    salesTrend: [200, 180, 150, 140, 160, 120, 100, 90, 60, 40, 20],
    websiteVisits: 123,
    stockLevel: 75,
    topProducts: [
      'Plug In Pendant Light',
      'Modern Chandelier Light',
      'Cluster Chandelier'
    ]
  },
  '2022': {
    totalRevenue: 999999,
    bestProduct: 'Modern Chandelier Light',
    bestCategory: 'Chandelier',
    salesTrend: [180, 160, 140, 130, 150, 110, 90, 80, 50, 30, 10],
    websiteVisits: 100,
    stockLevel: 65,
    topProducts: [
      'Modern Chandelier Light',
      'Plug In Pendant Light',
      'Cluster Chandelier'
    ]
  },
  '2021': {
    totalRevenue: 888888,
    bestProduct: 'Cluster Chandelier',
    bestCategory: 'Chandelier',
    salesTrend: [160, 140, 120, 110, 130, 90, 70, 60, 40, 20, 5],
    websiteVisits: 80,
    stockLevel: 55,
    topProducts: [
      'Cluster Chandelier',
      'Modern Chandelier Light',
      'Plug In Pendant Light'
    ]
  }
};

function Reports() {
  const [salesData, setSalesData] = useState<SalesData>(mockSalesData['2023']);
  const [selectedYear, setSelectedYear] = useState('2023');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real application, you would fetch data from your API here
        // const response = await fetch(`/api/sales-data?year=${selectedYear}`);
        // const data = await response.json();
        // setSalesData(data);
        
        // For now, we'll use mock data
        setSalesData(mockSalesData[selectedYear]);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:loading" className="w-12 h-12 text-sky-400 animate-spin" />
          <p className="mt-4 text-gray-600">Loading sales data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="px-8 py-8 bg-white">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
            <Icon icon="mdi:chart-bar" className="text-sky-400 w-8 h-8" />
            Reports & Analytics
          </h2>
          <p className="text-gray-500 text-md">Overview of sales, products, and performance</p>
        </div>

       

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Trend (Chart) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border-l-4 border-sky-200 p-6 flex flex-col hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="mdi:chart-line" className="text-sky-400 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
              <select 
                className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 bg-white ml-auto"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="2023">Year (2023)</option>
                <option value="2022">Year (2022)</option>
                <option value="2021">Year (2021)</option>
              </select>
            </div>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  points={salesData.salesTrend.map((value, index) => 
                    `${index * 50},${240 - value}`
                  ).join(' ')}
                />
                <polygon
                  fill="url(#gradient)"
                  points={`${salesData.salesTrend.map((value, index) => 
                    `${index * 50},${240 - value}`
                  ).join(' ')} 500,240 0,240`}
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
            {/* Top Products List */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-gray-700 mb-2">Top Products</h4>
              <ul className="text-sm text-gray-800 space-y-1 mb-4">
                {salesData.topProducts.map((product, index) => (
                  <li key={index}>Top {index + 1} <strong>{product}</strong></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="space-y-8">
            {/* Website Visits */}
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-200 p-6 flex flex-col items-center hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <Icon icon="mdi:web" className="w-8 h-8 text-green-400" />
                <h3 className="text-lg font-bold text-green-500">Website Visits</h3>
              </div>
              <span className="text-5xl font-bold text-center my-auto">{salesData.websiteVisits}</span>
            </div>
            {/* Stock Level */}
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-indigo-200 p-6 flex flex-col items-center hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <Icon icon="mdi:warehouse" className="w-8 h-8 text-indigo-400" />
                <h3 className="text-lg font-bold text-indigo-500">Stock Level</h3>
              </div>
              <Icon icon="mdi:chart-line-variant" className="text-5xl text-indigo-400 mb-2" />
              <button 
                className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1 hover:bg-gray-900 transition"
                onClick={() => console.log('View stock level details')}
              >
                <Icon icon="mdi:chart-box-outline" />
                View
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid - Actionable Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-8">
          {/* Total Sales Revenue */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-sky-300 p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="mdi:cash-multiple" className="w-8 h-8 text-sky-400" />
              <h3 className="text-lg font-bold text-sky-500">Total Sales Revenue</h3>
            </div>
            <p className="text-3xl font-bold mb-1">{formatCurrency(salesData.totalRevenue)}</p>
            <p className="text-sm text-gray-500 mb-4">Your total sale</p>
            <button 
              className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1 hover:bg-gray-900 transition"
              onClick={() => console.log('View revenue details')}
            >
              <Icon icon="mdi:eye-outline" />
              View
            </button>
          </div>
          {/* Best Sales by Product */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="mdi:package-variant-closed" className="w-8 h-8 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-500">Best Sales by Product</h3>
            </div>
            <p className="text-lg font-semibold">{salesData.bestProduct}</p>
            <p className="text-sm text-gray-500 mb-4">#PROD–000001</p>
            <button 
              className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1 hover:bg-gray-900 transition"
              onClick={() => console.log('View product details')}
            >
              <Icon icon="mdi:chart-box-outline" />
              View
            </button>
          </div>
          {/* Best Sales by Category */}
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-pink-300 p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="mdi:box" className="w-8 h-8 text-pink-400" />
              <h3 className="text-lg font-bold text-pink-500">Best Sales by Category</h3>
            </div>
            <p className="text-lg font-semibold">{salesData.bestCategory}</p>
            <p className="text-sm text-gray-500 mb-4">Best product sale</p>
            <button 
              className="self-end px-4 py-2 bg-black text-white text-sm rounded-lg flex items-center gap-1 hover:bg-gray-900 transition"
              onClick={() => console.log('View category details')}
            >
              <Icon icon="mdi:chart-box-outline" />
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
