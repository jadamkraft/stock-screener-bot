// src/components/Chart.jsx
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart({ data, macdData }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 800,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    });

    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(data);

    console.log('MACD Data:', macdData); // Debug for now

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [data, macdData]);

  return (
    <div ref={chartContainerRef} style={{ width: '100%' }} />
  );
}
