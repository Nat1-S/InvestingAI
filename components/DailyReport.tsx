import React, { useState } from 'react';
import { generateDailyReport } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import { SpinnerIcon } from './icons/Icons';
import { marked } from 'marked';

interface DailyReportProps {
  onReportGenerated: (text: string) => void;
  stocks: string[];
}

const DailyReport: React.FC<DailyReportProps> = ({ onReportGenerated, stocks }) => {
  const { t, language } = useAppContext();
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    if (stocks.length === 0) return;
    setIsLoading(true);
    setError(null);
    setReport('');
    onReportGenerated('');

    try {
      const response = await generateDailyReport(language, stocks);
      const reportText = response.text;
      const htmlContent = await marked.parse(reportText);
      setReport(htmlContent);
      onReportGenerated(reportText); // Pass raw text for podcast
    } catch (err) {
      setError(t('reportError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">{t('dailyReportTitle')}</h2>
      
      {!report && !isLoading && (
        <div className="text-center py-8">
          <button
            onClick={handleGenerateReport}
            disabled={isLoading || stocks.length === 0}
            className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-200 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {t('generateReport')}
          </button>
           {stocks.length === 0 && (
             <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t('addStockMessage')}</p>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-8 space-x-2 rtl:space-x-reverse text-gray-500 dark:text-gray-400">
          <SpinnerIcon />
          <span>{t('generatingReport')}</span>
        </div>
      )}

      {error && <p className="text-red-500 text-center py-8">{error}</p>}
      
      {report && (
        <div 
          className="prose prose-lg dark:prose-invert max-w-none rtl:text-right" 
          dangerouslySetInnerHTML={{ __html: report }}
        />
      )}
    </div>
  );
};

export default DailyReport;
