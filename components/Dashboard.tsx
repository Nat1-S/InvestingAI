import React, { useState } from 'react';
import Chatbot from './Chatbot';
import DailyReport from './DailyReport';
import PodcastPlayer from './PodcastPlayer';
import StockSelector from './StockSelector';
import { useAppContext } from '../hooks/useAppContext';

const Dashboard: React.FC = () => {
  const { t } = useAppContext();
  const [reportText, setReportText] = useState<string>('');
  const [podcastAudio, setPodcastAudio] = useState<string | null>(null);
  const [stocks, setStocks] = useState<string[]>(['AAPL', 'GOOGL', 'TSLA']);

  const addStock = (ticker: string) => {
    if (!stocks.includes(ticker)) {
      setStocks([...stocks, ticker]);
    }
  };

  const removeStock = (tickerToRemove: string) => {
    setStocks(stocks.filter(ticker => ticker !== tickerToRemove));
  };

  const handleReportGenerated = (text: string) => {
    setReportText(text);
    // When a new report is generated, reset the podcast audio
    setPodcastAudio(null);
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text">
          InvestingAI
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{t('tagline')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <StockSelector stocks={stocks} addStock={addStock} removeStock={removeStock} />
          <DailyReport stocks={stocks} onReportGenerated={handleReportGenerated} />
          <PodcastPlayer reportText={reportText} podcastAudio={podcastAudio} setPodcastAudio={setPodcastAudio} />
        </div>
        <div className="lg:col-span-1">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;