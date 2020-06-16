import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addFakeList, queryFakeList, removeFakeList, updateFakeList, deploy ,updateUnit} from './service';

import { BasicListItemDataType } from './data.d';
import { message } from 'antd';

export interface StateType {
  list: BasicListItemDataType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'processAndProcessList',

  state: {
    list: [],
    currentPage:1,
    pageSize:10,
    total:1,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *updateUnit({ payload }, { call, put }) {
      
      //执行更新操作
      const updateResult = yield call(updateUnit,payload);

      if(updateResult.success){
        const response = yield call(queryFakeList, payload); // post
        yield put({
          type: 'queryList',
          payload: response,
        });
      }else{
        message.error('更新失败');
      }


      
    },

    
    *deploy({ payload }, { call, put }){
      const response = yield call(deploy, payload);
      console.info(response);
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        currentPage:action.payload.currentPage,
        pageSize:action.payload.pageSize,
        total:action.payload.total,
        list:Array.isArray(action.payload.data) ? action.payload.data : [],
      };
    },
    appendList(state = { list: [] }, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },

    deploy(state, action){
      return {};
    }
  },
};

export default Model;
