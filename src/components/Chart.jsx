// src/components/Chart.jsx
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart({ data, macdData }) {
  const priceChartRef = useRef();
  const macdChartRef = useRef();

  useEffect(() => {
    // --- Top Chart: Candlesticks ---
    const priceChart = createChart(priceChartRef.current, {
      width: priceChartRef.current.clientWidth || 800,
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    });

    const candleSeries = priceChart.addCandlestickSeries();
    candleSeries.setData(data);

    // --- Bottom Chart: MACD ---
    const macdChart = createChart(macdChartRef.current, {
      width: macdChartRef.current.clientWidth || 800,
      height: 250,
      layout: {
        background: { color: '#f9f9f9' },
        textColor: '#222',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    });

    const macdLine = macdChart.addLineSeries({ color: '#2962FF', lineWidth: 2 });
    const signalLine = macdChart.addLineSeries({ color: '#D32F2F', lineWidth: 2 });
    const histogram = macdChart.addHistogramSeries({
      color: '#8884d8',
      lineWidth: 2,
      priceLineVisible: false,
      base: 0,
    });

    const formattedMACD = macdData.map(d => ({
      time: d.time,
      value: d.macd,
    }));

    const formattedSignal = macdData.map(d => ({
      time: d.time,
      value: d.signal,
    }));

    const formattedHistogram = macdData.map(d => ({
      time: d.time,
      value: d.histogram,
      color: d.histogram >= 0 ? '#26a69a' : '#ef5350',
    }));

    macdLine.setData(formattedMACD);
    signalLine.setData(formattedSignal);
    histogram.setData(formattedHistogram);

    // Resize support
    const resize = () => {
      const width = priceChartRef.current.clientWidth;
      priceChart.applyOptions({ width });
      macdChart.applyOptions({ width });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(priceChartRef.current);
    observer.observe(macdChartRef.current);

    return () => {
      priceChart.remove();
      macdChart.remove();
      observer.disconnect();
    };
  }, [data, macdData]);

  return (
    <div>
      <div ref={priceChartRef} style={{ width: '100%' }} />
      <div ref={macdChartRef} style={{ width: '100%', marginTop: '40px' }} />
    </div>
  );
}
