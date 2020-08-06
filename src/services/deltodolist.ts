import request, { Result } from '@/utils/request';

export interface DeltodolistParam {
  userID: number;
}

export interface DeltodolistResult
  extends Result<{
    token: string;
    expiresAt: number;
  }> {}

export function deltodolistApi(
  param: DeltodolistParam,
): Promise<DeltodolistResult> {
  return request('/api/v1/{userId}/todolists', {
    method: 'DELETE',
    data: '',
  });
}
