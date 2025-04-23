// src/data/mockCandles.js

function generateMockCandles(days = 50, startPrice = 100) {
    const candles = [];
    const startDate = new Date('2024-04-01');
  
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
  
      const open = startPrice + i * 0.5 + (Math.random() * 2 - 1);
      const close = open + (Math.random() * 4 - 2);
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
  
      candles.push({
        time: date.toISOString().split('T')[0], // format: YYYY-MM-DD
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
    }
  
    return candles;
  }
  
  export const mockCandles = generateMockCandles();
  