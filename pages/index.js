import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const [amount, setAmount] = useState(20);
  const [resultAmount, setResultAmount] = useState();
  const [currency, setCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };
  const handleTargetCurrency = (e) => {
    setTargetCurrency(e.target.value);

    var myHeaders = new Headers();
    myHeaders.append("apikey", "HxjEX0NL6JlbRnPXMnKeIkgL4jFMw1sS");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/fixer/convert?to=${targetCurrency}&from=${currency}&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setResultAmount(result.result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div>
          <h1>Currency Converter</h1>
        </div>
        <div className={styles.wrapper}>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <select name="currency" onChange={handleCurrency}>
            {Object.keys(data.symbols).map(function (key) {
              return (
                <option key={key} value={`${key}`}>
                  {data.symbols[key]}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.wrapper}>
          <input className={styles.converted} value={resultAmount} />
          <select name="targetCurrency" onChange={handleTargetCurrency}>
            {Object.keys(data.symbols).map(function (key) {
              return (
                <option key={key} value={`${key}`}>
                  {data.symbols[key]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  // this is just for presentation and its obviously not optimal to get the currency
  //  list every time that application runs

  var myHeaders = new Headers();
  myHeaders.append("apikey", "HxjEX0NL6JlbRnPXMnKeIkgL4jFMw1sS");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  let data = {};

  await fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      data = result;
    })
    .catch((error) => console.log("error", error));
  return {
    props: {
      data: {
        symbols: {
          BAM: "Bosnia-Herzegovina Convertible Mark",
          AWG: "Aruban Florin",
        },
      },
    },
  };
}
