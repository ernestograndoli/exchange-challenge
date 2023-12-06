import React from "react";
import { ChangeEvent } from "react";
import Skeleton from "react-loading-skeleton";

type THandleChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface ISelectProps {
  currencies: any;
  id: string;
  value: string;
  handlerOnChange: (e: THandleChange) => void;
}

export default function CurrencySelect(props: ISelectProps) {
  const { currencies, id, value, handlerOnChange } = props;
  return (
    <>
      {currencies ? (
        <select
          id={id}
          className="form-select fs-5 py-3"
          onChange={(e: THandleChange) => handlerOnChange(e)}
          value={value}
        >
          {Object.keys(currencies).map((currencyCode) => (
            <React.Fragment key={currencyCode}>
              <option value={currencyCode} className="fs-4">
                {currencyCode} - {currencies[currencyCode].name}
              </option>
            </React.Fragment>
          ))}
        </select>
      ) : (
        <Skeleton className="form-control" height={65} />
      )}
    </>
  );
}
