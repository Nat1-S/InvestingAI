export const translations: Record<string, Record<string, string>> = {
  en: {
    'appTitle': 'InvestingAI',
    'tagline': 'Your Daily 10-Minute Financial Briefing',
    'chatbotTitle': 'AI Financial Assistant',
    'chatbotPlaceholder': 'Ask about stocks, e.g., "What\'s new with AMZN?"',
    'dailyReportTitle': 'Your Daily Market Briefing',
    'generateReport': 'Generate Today\'s Report',
    'generatingReport': 'Generating Report...',
    'podcastTitle': 'Daily Podcast',
    'generatePodcast': 'Create Podcast Summary',
    'generatingPodcast': 'Creating Podcast...',
    'reportError': 'Failed to generate report. Please try again.',
    'podcastError': 'Failed to generate podcast. Please try again.',
    'chatError': 'Sorry, I couldn\'t get a response. Please try again.',
    'sources': 'Sources',
    'myStocks': 'My Stocks',
    'stockTickerPlaceholder': 'Enter stock ticker, e.g., AAPL',
    'addStock': 'Add',
    'addStockMessage': 'Add stocks to your list to generate a personalized report.',
  },
  he: {
    'appTitle': 'InvestingAI',
    'tagline': 'התדריך הפיננסי היומי שלך ב-10 דקות',
    'chatbotTitle': 'עוזר פיננסי AI',
    'chatbotPlaceholder': 'שאל על מניות, למשל, "מה חדש עם AMZN?"',
    'dailyReportTitle': 'תקציר השוק היומי שלך',
    'generateReport': 'הפק דוח להיום',
    'generatingReport': 'מפיק דוח...',
    'podcastTitle': 'פודקאסט יומי',
    'generatePodcast': 'צור תקציר פודקאסט',
    'generatingPodcast': 'יוצר פודקאסט...',
    'reportError': 'נכשל בהפקת הדוח. אנא נסה שנית.',
    'podcastError': 'נכשל ביצירת הפודקאסט. אנא נסה שנית.',
    'chatError': 'מצטער, לא הצלחתי לקבל תשובה. אנא נסה שנית.',
    'sources': 'מקורות',
    'myStocks': 'המניות שלי',
    'stockTickerPlaceholder': 'הזן סימול מניה, למשל AAPL',
    'addStock': 'הוסף',
    'addStockMessage': 'הוסף מניות לרשימה שלך כדי להפיק דוח מותאם אישית.',
  },
};

export const REPORT_PROMPT_TEMPLATES = {
    en: {
        generic: "Create a concise, easy-to-understand summary of the most important financial market news from the last 24 hours. Focus on major stock market indices (S&P 500, NASDAQ, Dow Jones), significant movements in tech stocks like Apple, Google, and Amazon, and any major economic announcements. The summary should be suitable for a middle-class software engineer who is a non-professional investor. Structure it with clear headings using markdown. Start with a title 'Daily Market Briefing for {date}'.",
        specific: "Create a concise, easy-to-understand summary of the most important financial market news from the last 24 hours, with a special focus on the following stocks: {stocks}. Also include a brief overview of major stock market indices (S&P 500, NASDAQ, Dow Jones) and any major economic announcements. The summary should be suitable for a middle-class software engineer who is a non-professional investor. Structure it with clear headings using markdown. Start with a title 'Personalized Market Briefing for {date}'."
    },
    he: {
        generic: "צור סיכום תמציתי וקל להבנה של חדשות השוק הפיננסי החשובות ביותר מ-24 השעות האחרונות. התמקד במדדי המניות העיקריים (S&P 500, נאסד\"ק, דאו ג'ונס), תנועות משמעותיות במניות טכנולוגיה כמו אפל, גוגל ואמזון, וכל הודעה כלכלית מרכזית. הסיכום צריך להתאים למהנדס תוכנה ממעמד הביניים שהוא משקיע לא מקצועי. בנה את הטקסט עם כותרות ברורות באמצעות markdown. התחל עם כותרת 'תקציר שוק יומי לתאריך {date}'.",
        specific: "צור סיכום תמציתי וקל להבנה של חדשות השוק הפיננסי החשובות ביותר מ-24 השעות האחרונות, עם דגש מיוחד על המניות הבאות: {stocks}. כלול גם סקירה קצרה של מדדי המניות העיקריים (S&P 500, נאסד\"ק, דאו ג'ונס) וכל הודעה כלכלית מרכזית. הסיכום צריך להתאים למהנדס תוכנה ממעמד הביניים שהוא משקיע לא מקצועי. בנה את הטקסט עם כותרות ברורות באמצעות markdown. התחל עם כותרת 'תקציר שוק מותאם אישית לתאריך {date}'."
    }
};
