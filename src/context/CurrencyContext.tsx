import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
  currencies: { code: string; symbol: string; rate: number }[];
}

const currencies = [
  { code: 'PKR', symbol: 'RS', rate: 1 },
  { code: 'USD', symbol: '$', rate: 1.1 },
  { code: 'EUR', symbol: '£', rate: 0.85 },
  // { code: 'GBP', symbol: '£', rate: 0.85 },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState('EUR');

  const formatPrice = (price: number) => {
    const curr = currencies.find(c => c.code === currency) || currencies[0];
    const converted = price * curr.rate;
    return `${converted.toFixed(0)}${curr.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
