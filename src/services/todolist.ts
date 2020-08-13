import request, { Result } from '@/utils/request';

//查询接口
export interface FetchTodolistParam {}

export interface FetchtodolistResult
  extends Result<
    {
      finished: boolean;
      description: string;
      itemId: number;
    }[]
  > {}

export function fetchTodolistApi(
  param: FetchTodolistParam,
): Promise<FetchtodolistResult> {
  return request('/api/v1/todolists', {
    method: 'GET',
    data: param,
  });
}

//添加接口
export interface AddtodoitemParam {
  finished: boolean;
  description: string;
}

export interface AddtodoitemResult
  extends Result<{
    code: number;
    msg: string;
    data: '';
    expiresAt: number;
  }> {}

export function addtodoitemApi(
  param: AddtodoitemParam,
): Promise<AddtodoitemResult> {
  return request('/api/v1/todolists', {
    method: 'POST',
    data: param,
  });
}

//删除接口
export interface DeltodoitemParam {
  itemId: number;
}

export interface DeltodoitemResult
  extends Result<{
    msg: string;
  }> {}

export function deltodoitemApi(
  param: DeltodoitemParam,
): Promise<DeltodoitemResult> {
  return request('/api/v1/todolists/?itemId=' + param.itemId, {
    method: 'DELETE',
  });
}

//切换状态接口
export interface UpdatetodolistParam {
  itemId: number;
  description: string;
  finished: boolean;
}

export interface UpdatetodolistResult
  extends Result<{
    description: string;
    finished: boolean;
    itemId: number;
    expiresAt: number;
  }> {}

export function updatetodolistApi(
  param: UpdatetodolistParam,
): Promise<UpdatetodolistResult> {
  return request('/api/v1/todolists/?itemId=' + param.itemId, {
    method: 'PUT',

    data: param,
  });
}

//删除全部接口
export interface DeltodolistParam {
  userID: number;
}

export interface DeltodolistResult
  extends Result<{
    expiresAt: number;
  }> {}

export function deltodolistApi(
  param: DeltodolistParam,
): Promise<DeltodolistResult> {
  return request('/api/v1/{userId}/todolists', {
    method: 'DELETE',
    data: param,
  });
}

//退出接口...
