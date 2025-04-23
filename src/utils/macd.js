// src/utils/macd.js
export function calculateMACD(data, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
    if (!data || data.length < longPeriod + signalPeriod) return [];
  
    const ema = (data, period) => {
      const k = 2 / (period + 1);
      const emaArray = [data[0]];
      for (let i = 1; i < data.length; i++) {
        emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
      }
      return emaArray;
    };
  
    const closes = data.map(d => d.close);
    const shortEMA = ema(closes, shortPeriod);
    const longEMA = ema(closes, longPeriod);
  
    const macdLine = shortEMA.map((val, i) => val - (longEMA[i] || 0));
    const signalLine = ema(macdLine.slice(longPeriod), signalPeriod);
    const histogram = macdLine.slice(longPeriod).map((val, i) => val - signalLine[i]);
  
    return data.slice(longPeriod).map((d, i) => ({
      time: d.time,
      macd: macdLine[i + longPeriod],
      signal: signalLine[i],
      histogram: histogram[i],
    }));
  }
  