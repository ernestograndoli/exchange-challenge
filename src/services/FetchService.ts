import { IError, IResponse } from "./IResponse";

interface FetchParams {
  url: string;
  body?: object;
}

interface IHeaders {
  [key: string]: string;
}

const baseURL = process.env.NEXT_PUBLIC_API;
const apiKey = process.env.NEXT_PUBLIC_APIKEY;

export class FetchService {
  public static getHeaders() {
    let headers: IHeaders = {
      ["apikey"]: apiKey as string,
    };

    return headers;
  }

  public static async getResponse<T>(res: Response): Promise<IResponse<T>> {
    try {
      if (res.status === 200) {
        const data = await res.json();
        return { status: res.status, data: data?.data };
      } else {
        const error: IResponse<IError> = await res.json();
        return { status: res.status, error: error.error };
      }
    } catch (err: any) {
      return { status: res.status, error: err.message };
    }
  }

  public static async get<T>(params: FetchParams): Promise<IResponse<T>> {
    const { url } = params;

    const headers = this.getHeaders();
    const options: RequestInit = {
      headers,
    };

    const res = await fetch(`${baseURL}${url}`, options);
    return await this.getResponse<T>(res);
  }
}
