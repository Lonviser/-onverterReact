import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyConverter from './components/CurrencyConverter';
import { useEffect } from 'react';

function App() {

useEffect(() => {
  async function fetchRates() {
    try {
      const response = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0');
      const data = await response.json();
      const ratesObj = data.reduce((acc, curr) => {
        acc[curr.Cur_Abbreviation] = curr.Cur_OfficialRate / curr.Cur_Scale;
        return acc;
      }, { BYN: 1 });
      setRates(ratesObj);
    } catch (error) {
      console.error('Ошибка API:', error);
    }
  }
  fetchRates();
}, []);


  return (
    <CurrencyConverter/>
  )
}

export default App
