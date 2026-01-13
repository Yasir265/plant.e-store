import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const categories = [
    { value: 'all', label: 'All Plants' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'bedroom', label: 'Bedroom' },
  ];

  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="section-padding">
          <div className="container-max">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span>Catalogue</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold">
              Our Plants
            </h1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-6 py-2 text-sm transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-foreground text-background'
                      : 'bg-gray-100 text-foreground hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="section-padding">
          <div className="container-max">
            <p className="text-muted-foreground mb-8">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CataloguePage;
