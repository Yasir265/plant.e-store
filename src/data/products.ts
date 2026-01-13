import plant1 from '@/assets/plant-1.jpg';
import plant2 from '@/assets/plant-2.jpg';
import plant3 from '@/assets/plant-3.jpg';
import plant4 from '@/assets/plant-4.jpg';
import plant5 from '@/assets/plant-5.jpg';
import plant6 from '@/assets/plant-6.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: 'indoor' | 'outdoor' | 'bedroom';
  description: string;
  inStock: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 150,
    image: plant1,
    images: [plant1, plant2, plant3, plant4],
    category: 'indoor',
    description: 'The iconic Swiss cheese plant with its distinctive split leaves. Perfect for adding a tropical touch to any room.',
    inStock: true,
    stock: 5,
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    price: 120,
    image: plant2,
    images: [plant2, plant1, plant5, plant6],
    category: 'indoor',
    description: 'A stunning statement plant with large, violin-shaped leaves that add elegance to any space.',
    inStock: false,
    stock: 0,
  },
  {
    id: '3',
    name: 'Succulent Collection',
    price: 50,
    image: plant3,
    images: [plant3, plant5, plant6, plant4],
    category: 'outdoor',
    description: 'A beautiful arrangement of various succulents in a rustic wooden planter.',
    inStock: true,
    stock: 12,
  },
  {
    id: '4',
    name: 'Golden Pothos',
    price: 35,
    image: plant4,
    images: [plant4, plant1, plant2, plant6],
    category: 'bedroom',
    description: 'An easy-care trailing plant with heart-shaped leaves. Perfect for beginners.',
    inStock: true,
    stock: 20,
  },
  {
    id: '5',
    name: 'Snake Plant',
    price: 65,
    image: plant5,
    images: [plant5, plant6, plant1, plant3],
    category: 'bedroom',
    description: 'A hardy plant known for its striking upright leaves and air-purifying qualities.',
    inStock: true,
    stock: 8,
  },
  {
    id: '6',
    name: 'Peace Lily',
    price: 45,
    image: plant6,
    images: [plant6, plant4, plant2, plant5],
    category: 'indoor',
    description: 'An elegant flowering plant with glossy leaves and beautiful white blooms.',
    inStock: true,
    stock: 15,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};
