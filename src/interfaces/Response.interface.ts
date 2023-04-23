export interface IResponse<T> {
  data: T;
}

export interface IResponseList<T> {
  data: T[];
}

export interface IResponsePaginated<T> {
  data: {
    items: T[];
  };
}

export interface ICommonCreateResponse {
  id: string;
}

export interface ICommonDeleteResponse {
  deleted: boolean;
}
