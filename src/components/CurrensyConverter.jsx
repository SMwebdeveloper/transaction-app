"use client";
import React, { useState, useEffect } from "react";

import { Badge } from "react-bootstrap";
import { fetchCurrency } from "../reusebale/fetchCurrency";

const CurrencyConverter = ({ amount, currency }) => {
  const [rates, setRates] = useState({});
  const [convertedValues, setConvertedValues] = useState({});

  useEffect(() => {
    // get currency
    const fetchRates = async () => {
      try {
        const currency = await fetchCurrency();
        setRates(currency);
      } catch (error) {
        console.error("Valyuta kurslarini olishda xatolik:", error);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    // Price convertate
    if (Object?.keys(rates).length > 0) {
      const usdToUzs = rates["UZS"];
      const usdToEur = rates["EUR"];

      if (currency === "uzs") {
        setConvertedValues({
          USD: (amount / usdToUzs).toFixed(2),
          EUR: ((amount / usdToUzs) * usdToEur).toFixed(2),
        });
        console.log(convertedValues);
      } else if (currency === "eur") {
        setConvertedValues({
          USD: (amount / usdToEur).toFixed(2),
          UZS: ((amount / usdToEur) * usdToUzs).toFixed(2),
        });
      } else if (currency === "usd") {
        setConvertedValues({
          UZS: (amount * usdToUzs).toFixed(2),
          EUR: (amount * usdToEur).toFixed(2),
        });
      }
    }
  }, [amount, currency, rates]);

  return (
    <div className="d-flex align-itmes-center justify-content-start">
      <p>
        {amount} {currency},
      </p>
      {currency !== "usd" && (
        <p className="text-primary  mx-2"> {convertedValues.USD} usd</p>
      )}
      {currency !== "eur" && (
        <p className="text-primary  mx-2"> {convertedValues.EUR} eur</p>
      )}
      {currency !== "uzs" && (
        <p className="text-primary  mx-2">{convertedValues.UZS} uzs</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
