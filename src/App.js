// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [baseCur, setBaseCur] = useState("EUR");
  const [targetCur, setTargetCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function convert() {
        if (amount === "0") {
          setConverted("0");
          return;
        }

        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCur}&to=${targetCur}`
        );
        const data = await res.json();
        setConverted(data.rates[targetCur]);
        setIsLoading(false);
      }

      if (baseCur === targetCur) return setConverted(amount);
      convert();
    }, 1000);

    return () => clearTimeout(timer);
  }, [amount, baseCur, targetCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          let value = e.target.value;
          if (/^\d*$/.test(value)) {
            setAmount(value === "" ? "0" : String(Number(value)));
          }
        }}
        disabled={isLoading}
      />
      <select
        value={baseCur}
        onChange={(e) => setBaseCur(e.target.value)}
        disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={targetCur}
        onChange={(e) => setTargetCur(e.target.value)}
        disabled={isLoading}>
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
