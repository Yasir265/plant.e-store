import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

type CheckoutStep = 'review' | 'shipping' | 'payment';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>('review');
  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('cod');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);

  // Cart loading wait (hydration ke liye)
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Context ke load hone ka chhota sa wait
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Order sucessfully submitted </h2>
          <button
            onClick={() => navigate('/catalogue')}
            className="btn-primary px-10 py-4 text-lg font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setOrderStatus('idle');

    // Fake processing time (real mein yahan API call hota)
    await new Promise(resolve => setTimeout(resolve, 2200));

    // 90% chance success (demo ke liye)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      const fakeOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      // Order save karo localStorage mein
      const orders = JSON.parse(localStorage.getItem('rad_plants_orders') || '[]');
      orders.push({
        id: fakeOrderId,
        date: new Date().toLocaleString('en-PK'),
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: totalPrice,
        paymentMethod: paymentMethod.toUpperCase(),
        shipping: shippingData,
        status: 'Confirmed',
      });
      localStorage.setItem('rad_plants_orders', JSON.stringify(orders));

      setOrderId(fakeOrderId);
      setOrderStatus('success');

      // Order place hone ke baad cart clear kar do
      clearCart();
    } else {
      setOrderStatus('error');
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          {['Review Cart', 'Shipping', 'Payment'].map((label, index) => (
            <div key={label} className="flex-1 text-center relative">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  step === 'review' && index === 0
                    ? 'bg-black text-white border-black'
                    : step === 'shipping' && index === 1
                    ? 'bg-black text-white border-black'
                    : step === 'payment' && index === 2
                    ? 'bg-black text-white border-black'
                    : index < ['review', 'shipping', 'payment'].indexOf(step)
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {index < ['review', 'shipping', 'payment'].indexOf(step) ? <Check size={18} /> : index + 1}
              </div>
              <p className="mt-2 text-sm font-medium">{label}</p>

              {index < 2 && (
                <div
                  className={`absolute top-5 left-0 w-full h-0.5 -z-10 ${
                    index < ['review', 'shipping', 'payment'].indexOf(step)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Review Step */}
        {step === 'review' && (
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h1 className="text-2xl font-serif font-bold mb-6">Order Review</h1>

            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/catalogue')}
                className="flex-1 border border-gray-300 py-4 rounded-lg hover:bg-gray-50"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setStep('shipping')}
                className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800"
              >
                Proceed to Shipping
              </button>
            </div>
          </div>
        )}

        {/* Shipping Step */}
        {step === 'shipping' && (
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-serif font-bold">Shipping Information</h1>
              <button
                onClick={() => setStep('review')}
                className="text-gray-600 hover:text-black flex items-center gap-1"
              >
                <ArrowLeft size={18} /> Back
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.fullName}
                  onChange={e => setShippingData({ ...shippingData, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.email}
                  onChange={e => setShippingData({ ...shippingData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.city}
                  onChange={e => setShippingData({ ...shippingData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Whatsapp No</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.phone}
                  onChange={e => setShippingData({ ...shippingData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Address</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.address}
                  onChange={e => setShippingData({ ...shippingData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={shippingData.postalCode}
                  onChange={e => setShippingData({ ...shippingData, postalCode: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={() => setStep('payment')}
              disabled={
                !shippingData.fullName.trim() ||
                !shippingData.email.trim() ||
                !shippingData.phone.trim()
              }
              className="mt-10 w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && orderStatus === 'idle' && (
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-serif font-bold">Payment Method</h1>
              <button
                onClick={() => setStep('shipping')}
                className="text-gray-600 hover:text-black flex items-center gap-1"
              >
                <ArrowLeft size={18} /> Back
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-4 p-5 border rounded-xl cursor-pointer hover:border-black transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-5 h-5 accent-black"
                />
                <div>
                  <p className="font-medium">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-600">Pay when you receive your order</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-5 border rounded-xl cursor-pointer hover:border-black transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="jazzcash"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="w-5 h-5 accent-black"
                />
                <div>
                  <p className="font-medium">JazzCash</p>
                  <p className="text-sm text-gray-600">Pay via JazzCash mobile wallet</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-5 border rounded-xl cursor-pointer hover:border-black transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="easypaisa"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('easypaisa')}
                  className="w-5 h-5 accent-black"
                />
                <div>
                  <p className="font-medium">EasyPaisa</p>
                  <p className="text-sm text-gray-600">Pay via EasyPaisa mobile account</p>
                </div>
              </label>

              <label className="flex items-center gap-4 p-5 border rounded-xl cursor-pointer hover:border-black transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-5 h-5 accent-black"
                />
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-600">Direct bank deposit (details will be sent via email)</p>
                </div>
              </label>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !paymentMethod}
              className={`mt-8 w-full py-4 rounded-lg font-medium text-lg transition-colors shadow-md ${
                isProcessing
                  ? 'bg-gray-400 cursor-wait text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Place Order (${paymentMethod.toUpperCase()})`
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By placing order, you agree to our Terms & Conditions
            </p>
          </div>
        )}

        {/* Success */}
        {orderStatus === 'success' && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-lg mx-auto mt-12">
            <div className="text-7xl mb-6">🌿🎉</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">Order Confirmed!</h2>
            <p className="text-lg mb-4 text-gray-700">
              Thank you for shopping with Rad Plants!
            </p>
            <p className="text-xl font-medium mb-2">
              Order ID: <span className="text-black">{orderId}</span>
            </p>
            <p className="text-gray-600 mb-6">
              {paymentMethod === 'cod'
                ? 'Payment will be collected on delivery.'
                : `Payment processed via ${paymentMethod.toUpperCase()}.`}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-12 py-4 rounded-xl font-medium hover:bg-gray-900 text-lg"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Error */}
        {orderStatus === 'error' && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-lg mx-auto mt-12">
            <div className="text-7xl mb-6">😔</div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-lg text-gray-700 mb-6">
              Something went wrong. Please try again or choose another method.
            </p>
            <button
              onClick={() => setOrderStatus('idle')}
              className="bg-black text-white px-12 py-4 rounded-xl font-medium hover:bg-gray-900 text-lg"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}