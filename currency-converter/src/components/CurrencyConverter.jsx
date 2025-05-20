import React, { useState } from "react";

function CurrencyConverter ({rates}){
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('BYN');
    const [toCurrency, setToCurrency] = useState('USD');
    const [result,setResult] = useState(0);

    const convert = (amount, fromCurrency, toCurrency, rates) =>{
        if(fromCurrency === 'BYN'){
            return amount * rates[toCurrency];
        } else if (toCurrency === 'BYN'){
            return amount / rates[fromCurrency];
        }
        else{
            return (amount/ rates[fromCurrency]) *rates[toCurrency]
        }
    }

    const handleAmountChange = (e)=>{
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) =>{
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) =>{
        setToCurrency(e.target.value);
    }

    console.log(amount);
     return(
        <div>
        <div className="converter-form container mt-5">
        <h1>Конвертер валют</h1>
        <div className="row">
            <div className="col-md-6">
            <input type="number" 
            className="form-control" 
            placeholder="Введите сумму"
            value={amount}
            onChange={handleAmountChange} />
            </div>
            <div className="col-md-3">
            <select 
            className="form-select"
            value={fromCurrency}
            onChange={handleToCurrencyChange}>
                <option>BYN</option>
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
                <option>PLN</option>
            </select>
            </div>
            <div className="col-md-3">
            <select 
            className="form-select"
            value={toCurrency}
            onChange={handleToCurrencyChange}
            >
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
                <option>PLN</option>
                <option>BYN</option>
            </select>
            </div>
        </div>
        <div className="mt-3">
            <h3>Результат: <span>{result}</span></h3>
        </div>
        </div>            
        </div>
    )
}
export default CurrencyConverter;