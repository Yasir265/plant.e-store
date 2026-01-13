import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface NewsletterPopupProps {
  delay?: number;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ delay = 3000 }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('rad-plants-newsletter-popup');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('rad-plants-newsletter-popup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/50 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-background p-8 md:p-12 max-w-lg w-full relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
            Get 15% off your next order
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our Newsletter
          </p>
          <NewsletterForm variant="large" />
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
