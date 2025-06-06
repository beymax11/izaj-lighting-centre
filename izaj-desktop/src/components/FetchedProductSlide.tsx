import { Icon } from '@iconify/react';

interface FetchedProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

interface FetchedProductSlideProps {
  fetchedProducts: FetchedProduct[];
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleAdd: (product: FetchedProduct) => void;
}

export function FetchedProductSlide({ fetchedProducts, currentIndex, handlePrev, handleNext }: FetchedProductSlideProps) {
  if (!fetchedProducts.length) return null;
  const product = fetchedProducts[currentIndex];
  return (
    <div className="w-full flex justify-center relative" style={{ minHeight: 320 }}>
      {/* Left Slide Button (offset from edge) */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:bg-yellow-100 border border-gray-200 transition-all duration-200 text-xl"
        aria-label="Previous"
      >
        <Icon icon="mdi:chevron-left" className="text-3xl text-yellow-500" />
      </button>
      {/* Product Card */}
      <div className="bg-gradient-to-br from-yellow-50 via-white to-white shadow-2xl border border-gray-100 overflow-hidden group w-[650px] p-0 transition-all duration-300 hover:shadow-yellow-200 relative">
        {/* Card Content */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105 bg-gray-100"
          />
          <div className="absolute top-8 left-8 bg-white/80 px-6 py-3 shadow text-lg font-semibold text-yellow-700 border border-yellow-100">
            {product.category}
          </div>
        </div>
        <div className="p-12 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h3>
          <p className="text-2xl text-yellow-600 font-semibold">{product.price}</p>
        </div>
      </div>
      {/* Right Slide Button (offset from edge) */}
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:bg-yellow-100 border border-gray-200 transition-all duration-200 text-xl"
        aria-label="Next"
      >
        <Icon icon="mdi:chevron-right" className="text-3xl text-yellow-500" />
      </button>
    </div>
  );
} 