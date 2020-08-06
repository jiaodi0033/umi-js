import request, { Result } from '@/utils/request';

export interface DeltodoitemParam {
  userId: number;
  itemId: number;
}

export interface DeltodoitemResult
  extends Result<{
    token: string;
    expiresAt: number;
  }> {}

export function deltodoitemApi(
  param: DeltodoitemParam,
): Promise<DeltodoitemResult> {
  return request('/api/v1/{userId}/todolists/{itemId}', {
    method: 'DELETE',
    data: [],
  });
}
