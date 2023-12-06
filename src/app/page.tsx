"use client";
import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Currencies } from "@/services/api/Currencies";
import { ExchangeRate } from "@/services/api/ExchangeRate";
import CurrencySelect from "@/components/CurrencySelect";
import Button from "@/components/Button";

type THandleChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function Home() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [baseRate, setBaseRate] = useState<number | undefined>();
  const [rate, setRate] = useState<number | undefined>();
  const [currencies, setCurrencies] = useState<any>();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const loadCurrencies = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    loadCurrencies();
  }, []);

  useEffect(() => {
    if (from !== "" && to !== "" && amount && buttonClicked) {
      convert(from, to);
    }
  }, [from, to]);

  const getCurrencies = async () => {
    const response = await Currencies.find();
    return response?.data;
  };

  const convert = async (from: string, to: string) => {
    if (!buttonClicked) {
      setIsFetching(true);
    }

    const response = await ExchangeRate.find(from, to);

    if (response?.data) {
      setBaseRate(response?.data[from]);
      setRate(response?.data[to]);
    }
    setIsFetching(false);
    setButtonClicked(true);
  };

  const toggleConvert = (from: string, to: string) => {
    setFrom(to);
    setTo(from);
  };

  const calculateExchange = (amount: number, rate: number) => {
    return (amount * rate).toFixed(5);
  };

  const reverseExchangeRate = (from: number, to: number) => {
    const result = ((from as number) * 1) / (to as number);
    return result.toFixed(5);
  };

  const handlerOnChange = (e: THandleChange) => {
    const { value, id } = e.target;

    switch (id) {
      case "from":
        setFrom(value);
        break;
      case "to":
        setTo(value);
        break;
      default:
        setAmount(Number(value));
    }
  };

  return (
    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-primary py-5">
      <div className="bg-white rounded-5 shadow p-3 p-md-5 exchangeContainer">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-3 col-xl-3">
            <label htmlFor="amount" className="form-label fw-bold fs-4">
              Importe:
            </label>
            <div className="input-group">
              <span className="input-group-text fs-5" id="basic-addon1">
                $
              </span>
              <input
                type="number"
                id="amount"
                className="form-control fs-5 py-3"
                placeholder="Ingrese un importe"
                onChange={(e) => handlerOnChange(e)}
                aria-label="amount"
                aria-describedby="basic-addon1"
                defaultValue={amount}
                min={1}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="from" className="form-label fw-bold fs-4">
              De:
            </label>
            <CurrencySelect
              currencies={currencies}
              id={"from"}
              value={from}
              handlerOnChange={handlerOnChange}
            />
          </div>
          <div className="col-12 col-12 col-md-1 margin-auto d-flex flex-row justify-content-center align-items-start p-0">
            <button
              className="btn d-flex flex-row justify-content-center align-items-center rounded-circle bg-primary toggleExchange"
              onClick={() => toggleConvert(from, to)}
            >
              <i
                className="bi bi-arrow-left-right"
                style={{ fontSize: "25px", color: "white" }}
              ></i>
            </button>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="to" className="form-label fw-bold fs-4">
              a:
            </label>
            <CurrencySelect
              currencies={currencies}
              id={"to"}
              value={to}
              handlerOnChange={handlerOnChange}
            />
          </div>
        </div>
        <div className="row mt-3 mt-md-5">
          <div className="col-12 col-md-8">
            {baseRate && rate && (
              <div className="d-flex flex-column ">
                <p className="fs-4 fw-bold opacity-50">
                  {amount} {currencies[from].name} =
                </p>
                <p className="fs-1 fw-bold">
                  {calculateExchange(amount, rate!)} {currencies[to].name}
                </p>
                <p className="fs-5 fw-regular">
                  1 {currencies[from].code} = {rate?.toFixed(5)}{" "}
                  {currencies[to].code}
                </p>
                <p className="fs-5 fw-regular">
                  1 {currencies[to].code} ={" "}
                  {reverseExchangeRate(baseRate, rate)} {currencies[from].code}
                </p>
              </div>
            )}
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-start">
            {!buttonClicked && (
              <Button
                label={"Convertir"}
                showLoading={isFetching}
                onClick={() => convert(from, to)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
