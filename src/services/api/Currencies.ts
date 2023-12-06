import { FetchService } from "@/services/FetchService";
import { IResponse } from "@/services/IResponse";

export interface ICurrency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export type TCurrency = Record<string, ICurrency>;

const URL_API = "/currencies";

export class Currencies {
  public static async find(): Promise<IResponse<TCurrency>> {
    return FetchService.get<TCurrency>({
      url: `${URL_API}`,
    });
  }
}
