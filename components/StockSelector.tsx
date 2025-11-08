import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { TrashIcon } from './icons/Icons';

interface StockSelectorProps {
  stocks: string[];
  addStock: (ticker: string) => void;
  removeStock: (ticker: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ stocks, addStock, removeStock }) => {
  const { t } = useAppContext();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const ticker = input.trim().toUpperCase();
    if (ticker) {
      addStock(ticker);
      setInput('');
    }
  };

  return (
    <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">{t('myStocks')}</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={t('stockTickerPlaceholder')}
          className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
        >
          {t('addStock')}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {stocks.map((stock) => (
          <span key={stock} className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
            {stock}
            <button onClick={() => removeStock(stock)} className="ml-1.5 rtl:mr-1.5 rtl:ml-0 p-0.5 rounded-full text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
              <TrashIcon />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockSelector;
