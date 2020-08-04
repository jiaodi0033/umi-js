import request, { Result } from '@/utils/request';

export interface LoginParam {
  passWord: string;
  userName: string;
}

export interface LoginResult
  extends Result<{
    token: string;
    expiresAt: number;
  }> {}

export function loginApi(param: LoginParam): Promise<LoginResult> {
  return request('/api/v1/accounts/login', {
    method: 'POST',
    data: param,
  });
}
