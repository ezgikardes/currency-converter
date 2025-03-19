// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [baseCur, setBaseCur] = useState("EUR");
  const [targetCur, setTargetCur] = useState("USD");
  const [converted, setConverted] = useState("");

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCur}&to=${targetCur}`
        );
        const data = await res.json();

        setConverted(data.rates[targetCur]);
      }
      convert();
    },
    [amount, baseCur, targetCur]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          let value = e.target.value;
          if (/^\d*$/.test(value)) {
            setAmount(value);
          }
        }}
      />
      <select value={baseCur} onChange={(e) => setBaseCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={targetCur} onChange={(e) => setTargetCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {targetCur}
      </p>
    </div>
  );
}
