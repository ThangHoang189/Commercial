import Axios from 'axios';
import React, { useState, useEffect } from 'react';

const GoldPrice = () => {
  const [goldPriceVND, setGoldPriceVND] = useState(0);
  const [goldPriceUSD, setGoldPriceUSD] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [goldPNJ, setGoldPNJ] = useState([0, 0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const getExchangeRate = async () => {
    const data = (await Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/vnd.json`)).data;
    return Number.parseInt(data.vnd ?? '0');
  };

  const getGold = async () => {
    const data = await (
      await fetch('https://api.metalpriceapi.com/v1/latest?api_key=5477f1bffc91f8bb43e25aa56d976a50&base=XAU&currencies=USD', {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
    ).json();

    return Number.parseFloat(data.rates.USD);
  };

  const getVNGoldPrice = async () => {
    const data = (await Axios.get('https://webapi.dantri.com.vn/gia-vang')).data;
    const pnjPrice = data[3].last.prices[3];
    return [Number.parseFloat(pnjPrice.buyPrice), Number.parseFloat(pnjPrice.sellPrice)];
  };

  const calculateGold = async () => {
    const [goldPrice, rateExchange, goldVND] = await Promise.all([getGold(), getExchangeRate(), getVNGoldPrice()]);

    const gold = (((goldPrice + 1) * 1.01) / 0.82945) * rateExchange + 40000;
    setExchangeRate(rateExchange);
    setGoldPriceUSD(Math.floor(goldPrice));
    setGoldPriceVND(Math.floor(gold));
    setGoldPNJ(goldVND);
  };
  useEffect(() => {
    if (!isLoaded) {
      calculateGold();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <div>
      <label>
        Gia vang (PNJ): {goldPNJ[0].toLocaleString()} - {goldPNJ[1].toLocaleString()}
      </label>
      <br />
      <label>Gia vang (VND): {goldPriceVND.toLocaleString()}</label>
      <br />
      <label>Gia vang (USD): {goldPriceUSD.toLocaleString()}</label>
      <br />
      <label>Ti gia (USD): {exchangeRate.toLocaleString()}</label>
    </div>
  );
};

export default GoldPrice;
