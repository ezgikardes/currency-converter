// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState(0);
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("USD");

  useEffect(
    function () {
      fetch(
        `https://api.frankfurter.app/latest?amount=100&from=${base}&to=${target}`
      )
        .then((res) => res.json())
        .then((data) => setOutput(amount * data.rates[target]));
    },
    [amount, base, target]
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
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
