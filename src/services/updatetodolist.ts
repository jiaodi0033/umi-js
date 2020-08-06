import request, { Result } from '@/utils/request';

export interface UpdatetodolistParam {
  description: string;
  finished: boolean;
  itemId: number;
}

export interface UpdatetodolistResult
  extends Result<{
    token: string;
    expiresAt: number;
  }> {}

export function updatetodolistApi(
  param: UpdatetodolistParam,
): Promise<UpdatetodolistResult> {
  return request('/api/v1/{userId}/todolists/{itemId}', {
    method: 'PUT',
    data: param,
  });
}
