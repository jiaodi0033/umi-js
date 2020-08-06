import request, { Result } from '@/utils/request';

export interface RegisterParam {
  passWord: string;
  userName: string;
}

export interface RegisterResult
  extends Result<{
    token: string;
    expiresAt: number;
  }> {}

export function registerApi(param: RegisterParam): Promise<RegisterResult> {
  return request('/api/v1/accounts/register', {
    method: 'POST',
    data: param,
  });
}
