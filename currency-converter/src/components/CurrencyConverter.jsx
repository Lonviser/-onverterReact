import React from "react";

function CurrencyConverter ({rates}){
    return(
        <div>
        <div className="converter-form container mt-5">
        <h1>Конвертер валют</h1>
        <div className="row">
            <div className="col-md-6">
            <input type="number" className="form-control" placeholder="Введите сумму" />
            </div>
            <div className="col-md-3">
            <select className="form-select">
                <option>BYN</option>
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
                <option>PLN</option>
            </select>
            </div>
            <div className="col-md-3">
            <select className="form-select">
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
                <option>PLN</option>
                <option>BYN</option>
            </select>
            </div>
        </div>
        <div className="mt-3">
            <h3>Результат: <span>0</span></h3>
        </div>
        </div>            
        </div>
    )
}
export default CurrencyConverter;