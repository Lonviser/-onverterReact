import React, { useEffect, useState } from "react";
import replacment from '../../assets/replacment.png';
import './CurrencyConverter.css';

function CurrencyConverter({ rates, isLoading, error }) {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("BYN");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);

  const currencies = ["BYN", "USD", "EUR", "RUB", "PLN"];

const convert = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return 0;

  let amountInBYN;
  if (fromCurrency === "BYN") {
    amountInBYN = amount;
  } else {
    amountInBYN = amount * rates[fromCurrency]; 
  }

  if (toCurrency === "BYN") {
    return amountInBYN;
  } else {
    return amountInBYN / rates[toCurrency]; 
  }
};

  useEffect(() => {
    if (
      Object.keys(rates).length > 0 &&
      rates[fromCurrency] &&
      rates[toCurrency] &&
      amount > 0
    ) {
      const res = convert(Number(amount), fromCurrency, toCurrency, rates);
      setResult(res);
    } else {
      setResult(0);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleReset = () => {
    setAmount(0);
    setResult(0);
    setFromCurrency("BYN");
    setToCurrency("USD");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h1 className="text-center mb-4">Конвертер валют</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Введите сумму"
              value={amount}
              onChange={handleAmountChange}
              autoFocus
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {currencies
                .filter((currency) => currency !== toCurrency)
                .map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-2 text-center">
            <button className="replacment-btn btn btn-outline-primary" onClick={handleSwap}>
              <img src={replacment} alt="Swap" />
            </button>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              {currencies
                .filter((currency) => currency !== fromCurrency)
                .map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-12 text-center mt-3">
            <button className="btn btn-secondary" onClick={handleReset}>
              Очистить
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          {isLoading ? (
            <h3>Загрузка...</h3>
          ) : amount == 0 ? (
            <h3>Введите сумму для конвертации</h3>
          ) : (
            <h3 className="result text-success">
              {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
            </h3>
          )}
        </div>
        {Object.keys(rates).length > 0 && !isLoading && !error && (
          <div className="mt-5">
            <h4>Текущие курсы валют (к BYN)</h4>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>Курс (за 1 BYN)</th>
                </tr>
              </thead>
              <tbody>
                {currencies
                  .filter((currency) => currency !== "BYN")
                  .map((currency) => (
                    <tr key={currency}>
                      <td>{currency}</td>
                      <td>{(1 / rates[currency]).toFixed(4)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;