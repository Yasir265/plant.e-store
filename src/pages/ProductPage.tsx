import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import NewsletterForm from '@/components/NewsletterForm';
import NewsletterPopup from '@/components/NewsletterPopup';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/catalogue" replace />;
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <NewsletterPopup delay={5000} />
      <main className="pt-16 md:pt-20">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="section-padding">
            <div className="container-max">
              <nav className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/catalogue" className="hover:text-foreground">Catalogue</Link>
                <span className="mx-2">/</span>
                <span>{product.name}</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12 md:py-16">
          <div className="section-padding">
            <div className="container-max">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Images */}
                <div>
                  <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-gray-100 overflow-hidden transition-opacity ${
                          selectedImage === index
                            ? 'ring-2 ring-foreground'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  {!product.inStock && (
                    <span className="inline-block bg-foreground text-background px-4 py-2 text-xs uppercase tracking-wider mb-4">
                      Sold Out
                    </span>
                  )}
                  <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                    {product.name}
                  </h1>
                  <p className="font-serif text-3xl md:text-4xl font-bold mb-6">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-muted-foreground mb-8">
                    {product.description}
                  </p>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm uppercase tracking-wider mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1 || !product.inStock}
                        className="w-10 h-10 flex items-center justify-center border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock || !product.inStock}
                        className="w-10 h-10 flex items-center justify-center border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>

                  {/* Newsletter */}
                  <div className="mt-16 pt-16 border-t border-border">
                    <h3 className="font-serif text-xl font-semibold mb-2 text-center">
                      Get 15% off your next order
                    </h3>
                    <p className="text-muted-foreground mb-6 text-center text-sm">
                      Subscribe to our Newsletter
                    </p>
                    <NewsletterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-100">
            <div className="section-padding">
              <div className="container-max">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8 text-center">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductPage;
