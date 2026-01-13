import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-greenhouse.jpg';
import categoryIndoor from '@/assets/category-indoor.jpg';
import categoryOutdoor from '@/assets/category-outdoor.jpg';
import categoryBedroom from '@/assets/category-bedroom.jpg';
import blogWatering from '@/assets/blog-watering.jpg';
import blogRepotting from '@/assets/blog-repotting.jpg';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import NewsletterPopup from '@/components/NewsletterPopup';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);

  const categories = [
    { name: 'Indoor Plants', image: categoryIndoor, filter: 'indoor' },
    { name: 'Outdoor Plants', image: categoryOutdoor, filter: 'outdoor' },
    { name: 'Bedroom Plants', image: categoryBedroom, filter: 'bedroom' },
  ];

  const blogPosts = [
    {
      id: 1,
      image: blogWatering,
      author: 'Melissa Bail',
      edition: 291,
      title: 'How to water your freaking plants so they don\'t die after one week',
    },
    {
      id: 2,
      image: blogRepotting,
      author: 'Jesse Rowe',
      edition: 292,
      title: 'How to repot a Monstera without killing it and foster its growth',
    },
  ];

  return (
    <>
      <NewsletterPopup />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="section-padding">
            <div className="container-max text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 max-w-3xl mx-auto">
                Find perfect plants for your home
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Beautiful plants that encourage you to get creative.
              </p>
              <Link to="/catalogue" className="btn-primary inline-block">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="w-full aspect-[16/7] overflow-hidden">
            <img
              src={heroImage}
              alt="Beautiful greenhouse filled with lush tropical plants"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="section-padding">
            <div className="container-max">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12 text-center">
                Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/catalogue?category=${category.filter}`}
                    className="group"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-center text-lg font-medium">{category.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="section-padding">
            <div className="container-max">
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-center max-w-4xl mx-auto font-medium italic">
                "Love and work are to people what water and sunshine are to plants."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="section-padding">
            <div className="container-max">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                  Featured
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-4">
                  Our plants are 100% organic, we don't use pesticides or harmful chemicals. 
                  But please don't eat them.
                </p>
                <Link to="/catalogue" className="link-underline text-sm uppercase tracking-wider">
                  Shop All Favourites
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="section-padding">
            <div className="container-max">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-12 text-center">
                From the Journal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-200 mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>Written by {post.author}</span>
                      <span>•</span>
                      <span>Edition {post.edition}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium group-hover:underline">
                      {post.title}
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24">
          <div className="section-padding">
            <div className="container-max text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                Get 15% off your next order
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our Newsletter
              </p>
              <NewsletterForm variant="large" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
