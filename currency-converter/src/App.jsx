import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyConverter from './components/CurrencyConverter';
import { useEffect, useState } from 'react';

function App() {
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0');
        const data = await response.json();
        const ratesObj = data.reduce(
          (acc, curr) => {
            acc[curr.Cur_Abbreviation] = curr.Cur_OfficialRate / curr.Cur_Scale;
            return acc;
          },
          { BYN: 1 }
        );
        setRates(ratesObj);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка API:', error);
        setError('Не удалось загрузить курсы валют');
        setIsLoading(false);
      }
    }
    fetchRates();
  }, []);

  return (
    <CurrencyConverter rates={rates} isLoading={isLoading} error={error} />
  );
}

export default App;