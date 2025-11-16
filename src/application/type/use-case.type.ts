export type UseCaseResponse<T = any> = {
  data: T;
  success: boolean;
  message?: string;
  code?: string;
};

export interface UseCase<P = any> {
  execute: (params?: P) => Promise<UseCaseResponse> | UseCaseResponse;
}
