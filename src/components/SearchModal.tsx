import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { useCurrency } from '@/context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();

  const filteredProducts = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-background animate-fade-in">
      <div className="section-padding py-20">
        <div className="container-max">
          <div className="flex items-center gap-4 border-b border-border pb-4 mb-8">
            <Search className="w-6 h-6 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for plants..."
              className="flex-1 text-2xl md:text-3xl font-serif bg-transparent border-0 outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {query.trim() && (
            <div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="group"
                    >
                      <div className="aspect-square bg-gray-100 mb-3 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm mb-1">{product.name}</h3>
                      <p className="font-serif font-semibold">{formatPrice(product.price)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-12">
                  No products found for "{query}"
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
