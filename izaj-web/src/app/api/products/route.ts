import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockProducts = [
  {
    id: '1',
    name: 'Abednego | Chandelier/Large',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 2999,
    originalPrice: 3999,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'TechBrand',
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    sku: 'TB-HP-001',
    tags: ['wireless', 'noise-cancellation', 'premium'],
    isOnSale: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch',
    price: 4999,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'FitTech',
    rating: 4.8,
    reviewCount: 256,
    stock: 30,
    sku: 'FT-SW-001',
    tags: ['fitness', 'smartwatch', 'health'],
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Speaker',
    description: 'Portable speaker with excellent sound quality',
    price: 1999,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'SoundMax',
    rating: 4.3,
    reviewCount: 89,
    stock: 75,
    sku: 'SM-BS-001',
    tags: ['bluetooth', 'portable', 'speaker'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === brand);
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'category', 'brand'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new product
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real app, you would save this to a database
    mockProducts.push(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
