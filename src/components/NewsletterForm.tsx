import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');

interface NewsletterFormProps {
  variant?: 'default' | 'large';
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setEmail('');
    
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className={`flex ${variant === 'large' ? 'flex-col sm:flex-row gap-3' : 'flex-row'}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email here"
          className={`flex-1 px-4 py-3 bg-gray-100 border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground ${
            variant === 'large' ? 'text-base' : 'text-sm'
          }`}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      {success && (
        <p className="text-foreground text-sm mt-2">
          Thank you! Check your inbox for 15% off.
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
