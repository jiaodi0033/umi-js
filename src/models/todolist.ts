import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getToken, isTokenValid, saveToken } from '@/utils/token';
import { isSuccess } from '@/utils/request';
import {
  fetchTodolistApi,
  FetchTodolistParam,
  FetchtodolistResult,
} from '@/services/todolist';
import { addtodoitemApi } from '@/services/todolist';
import { deltodoitemApi } from '@/services/todolist';
import { updatetodolistApi } from '@/services/todolist';

interface TodoItem {
  itemId: number;
  description: string;
  finished: boolean;
}

export interface TodoModelState {
  items: TodoItem[];
}

export interface TodoListType {
  namespace: 'todolist';
  state: TodoModelState;
  effects: {
    get: Effect;
    // add: Effect;
    // delete: Effect;
    // change: Effect;
  };
  reducers: {
    save: Reducer<TodoModelState>;

    // update: Reducer<TodoModelState>;
  };
  subscriptions: { setup: Subscription };
}

// @ts-ignore
const TodoListModel: TodoListType = {
  namespace: 'todolist',
  state: {
    items: [],
  },
  effects: {
    *get(_, { put, call }) {
      const result = yield call(fetchTodolistApi({}));
      console.log('显示todo');
      if (isSuccess(result)) {
        console.log('======');
        console.log(result.data);
        yield put({
          type: 'save',
          payload: result.data,
        });
      }
    },
    // (
    //   async () => {
    //     const result = await yield call( fetchTodolistApi({}))
    //     if (isSuccess(result)) {
    //       console.log(result.data)
    //      yield put({
    //      type:'save',
    //      payload:result.data})
    //     }
    //   }
    // )(),
    // *add({ payload }, { put, call }) {
    //   // @ts-ignore
    //   const { data } = yield call(addtodoitemApi(), payload.keyWord);
    //   if (data) {
    //     yield put({
    //       type: 'addTodos',
    //       payload: data
    //     })
    //
    //   }
    // },
    // *delete({ payload }, { put, call }) {
    //   // @ts-ignore
    //   const { data } = yield call(deltodoitemApi(), payload.itemId);
    //   console.log(data);
    //   if (!!data) {
    //     yield put({
    //       type: 'deleteTodos',
    //       payload
    //     })
    //
    //   }
    //   },
    //
    //   *change({ payload }, { put, call }) {
    //     // @ts-ignore
    //     const { data } = yield call(updatetodolistApi(), payload.finished);
    //     if (data) {
    //       yield put({
    //         type: 'update',
    //         payload: {
    //           ...data
    //         }
    //       })
    //     }
    //   }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        items: action.payload,
      };
    },
    //   addTodos(state, action) {
    //     return {
    //       ...state,
    //     }
    //   },
    //   deleteTodos(state, action) {
    //     let newList = state.list.filter(item => item.id !== action.payload.id)
    //     return {
    //       ...state,
    //       list: newList,
    //     }
    //   },
    //   update(state, action) {
    //     let newList = state.list.map(item => {
    //       if (item.id === action.payload.id) {
    //         item.completed = !item.completed;
    //       }
    //       return item;
    //     })
    //     return {
    //       ...state,
    //       list: newList
    //     }
    //   }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/todolist') {
          dispatch({
            type: 'getList',
          });
        }
      });
    },
  },
};

export default TodoListModel;
