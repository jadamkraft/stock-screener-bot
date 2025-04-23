import './App.css';
import Chart from './components/Chart.jsx';
import { mockCandles } from './data/mockCandles';

function App() {
  return (
    <div className="App">
      <header>
        <h1>MACD Screener MVP</h1>
      </header>

      <section>
        <Chart data={mockCandles} />
      </section>
    </div>
  );
}

export default App;
