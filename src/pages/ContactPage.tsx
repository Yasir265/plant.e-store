import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { MapPin, Phone, Mail } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="section-padding">
          <div className="container-max">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Contact</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold">
              Get in Touch
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
                  We'd love to hear from you
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have a question about our plants? Want to learn more about plant
                  care? Or just want to say hello? Drop us a line and we'll get
                  back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <p className="text-muted-foreground text-sm">
                        Jinnah Avenue
                        <br />
                        Blue Area Islamabad
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground text-sm">
                        +92 349 0052084
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground text-sm">
                        muhammadyasirkhan318@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm uppercase tracking-wider mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-foreground ${
                        errors.name ? 'ring-2 ring-destructive' : ''
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm uppercase tracking-wider mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-foreground ${
                        errors.email ? 'ring-2 ring-destructive' : ''
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm uppercase tracking-wider mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-foreground resize-none ${
                        errors.message ? 'ring-2 ring-destructive' : ''
                      }`}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full md:w-auto disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>

                  {success && (
                    <p className="text-foreground font-medium">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
