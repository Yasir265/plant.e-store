import { Link } from 'react-router-dom';
import { useCurrency } from '@/context/CurrencyContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const { currency, setCurrency, currencies } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <footer className="bg-gray-100 py-16">
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo */}
            <div className="lg:col-span-2">
              <Link to="/" className="font-serif text-2xl font-bold text-foreground">
                Rad Plants
              </Link>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-sans text-sm font-medium uppercase tracking-wider mb-4">Connect</h3>
              <ul className="space-y-2">
                {['Instagram', 'Facebook', 'Pinterest', 'YouTube'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-sans text-sm font-medium uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Return Policy', 'Track An Order', 'FAQs', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-sans text-sm font-medium uppercase tracking-wider mb-4">About</h3>
              <ul className="space-y-2">
                {['Our Story', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
            <p className="text-sm text-muted-foreground">
              Designed by Muhammad Yasir Khan.
            </p>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-muted transition-colors text-sm"
              >
                {currency}
                <ChevronDown className="w-4 h-4" />
              </button>
              {currencyOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-background border border-border shadow-lg">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setCurrencyOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                        currency === curr.code ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      {curr.code} ({curr.symbol})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
