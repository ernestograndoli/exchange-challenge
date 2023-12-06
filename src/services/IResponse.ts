interface IError {
  message: string;
  errors: [key: string[]];
}

export interface IResponse<T> {
  status: number;
  data?: T;
  error?: IError;
}
