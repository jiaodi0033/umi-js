import request, { Result } from '@/utils/request';

export interface FetchTodolistParam {
  Authorization: string;
}

export interface FetchtodolistResult
  extends Result<{
    expiresAt: number;
  }> {}

export function fetchTodolistApi(
  param: FetchTodolistParam,
): Promise<FetchtodolistResult> {
  return request('/api/v1/{userId}/todolists', {
    method: 'GET',
    data: [],
  });
}
