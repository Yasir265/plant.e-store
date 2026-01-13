import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useCurrency();

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-wider">
            Sold Out
          </span>
        )}
      </div>
      <h3 className="font-sans text-base mb-1">{product.name}</h3>
      <p className="font-serif text-xl font-semibold">{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductCard;
