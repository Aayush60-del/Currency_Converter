import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [num, setNum] = useState("");
  const [chgNum, setChgNum] = useState("");
  const [curr, setCurr] = useState("");
  const [convert, setConvert] = useState(false);

  useEffect(() => {
    if (!convert) {
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${curr}`
        );

        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();

        const rate = data.rates[curr];
        const convertedAmount = Number(num) * rate;

        setChgNum(convertedAmount.toFixed(2));
      } catch (error) {
        console.log(error);
      } finally {
        setConvert(false);
      }
    }

    fetchData();
  }, [convert, num, curr]);

  function Call() {
    if (num !== "" && curr !== "") {
      setConvert(true);
    }
  }

  function swapValues() {
    const temp = num;
    setNum(chgNum);
    setChgNum(temp);
  }

  return (
    <div className="app-container">
      <div className="converter-card">
        <h1>Currency Converter</h1>
        <p className="subtitle">Convert USD into another currency</p>

        <div className="form-group">
          <label>Amount in USD</label>

          <input
            type="number"
            placeholder="Enter USD amount"
            value={num}
            onChange={(event) => {
              setNum(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Select Currency</label>

          <select
            value={curr}
            onChange={(event) => {
              setCurr(event.target.value);
            }}
          >
            <option value="">Select currency</option>
            <option value="INR">Indian Rupee</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
            <option value="JPY">Japanese Yen</option>
          </select>
        </div>

        <p className="selected-currency">
          Selected Currency: {curr || "None"}
        </p>

        <div className="button-group">
          <button
            className="swap-button"
            onClick={swapValues}
          >
            Swap
          </button>

          <button
            className="convert-button"
            onClick={Call}
            disabled={convert}
          >
            {convert ? "Converting..." : "Convert"}
          </button>
        </div>

        <div className="result-group">
          <label>Converted Amount</label>

          <input
            type="number"
            placeholder="Converted currency"
            value={chgNum}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;