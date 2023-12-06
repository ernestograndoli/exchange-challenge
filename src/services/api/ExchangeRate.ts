import { FetchService } from "@/services/FetchService";
import { IResponse } from "@/services/IResponse";

export type TExchangeRate = Record<string, number>;

const URL_API = "/latest";

export class ExchangeRate {
  public static async find(
    from: string,
    to: string
  ): Promise<IResponse<TExchangeRate>> {
    return FetchService.get<TExchangeRate>({
      url: `${URL_API}?base_currency=${from}&currencies=${from},${to}`,
    });
  }
}
