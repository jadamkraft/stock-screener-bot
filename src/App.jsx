import './App.css';
import Chart from './components/Chart';
import { mockCandles } from './data/mockCandles';
import { calculateMACD } from './utils/macd';

function App() {
  const macdData = calculateMACD(mockCandles);

  return (
    <div className="App">
      <h1>MACD Screener MVP</h1>
      <Chart data={mockCandles} macdData={macdData} />
    </div>
  );
}

export default App;
