import React, { useEffect, useState } from "react";

function CurrencyConverter({ rates }) {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("BYN");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(0);

  const convert = (amount, fromCurrency, toCurrency, rates) => {
    if (fromCurrency === "BYN") {
      return amount * rates[toCurrency];
    } else if (toCurrency === "BYN") {
      return amount / rates[fromCurrency];
    } else {
      return (amount / rates[fromCurrency]) * rates[toCurrency];
    }
  };
  useEffect(() => {
    if (!rates) return;
    const res = convert(Number(amount), fromCurrency, toCurrency, rates);
    setResult(res);
  }, [amount, fromCurrency, toCurrency, rates]);

  // Обработчик для input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Обработчики для select
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  console.log(amount);
  return (
    <div className="converter-form container mt-5">
      <h1>Конвертер валют</h1>
      <div className="row">
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="Введите сумму"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="BYN">BYN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="PLN">PLN</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={toCurrency}
            onChange={handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="PLN">PLN</option>
            <option value="BYN">BYN</option>
          </select>
        </div>
      </div>
      <div className="mt-3">
        <h3>
          Результат: <span>{result.toFixed(3)}</span>
        </h3>
      </div>
    </div>
  );
}

export default CurrencyConverter;