import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {addConnection, addFakeList, queryFakeList, removeFakeList, testConnection, updateFakeList} from './service';

import { DataBaseConnectionModel } from './data.d';

export interface StateType {
  list: DataBaseConnectionModel[];
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
  namespace: 'datasource',

  state: {
    list: [],
    current:1,
    pageSize:10,
    total:1,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload:response,

      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *addConnection({ payload }, { call }){
      yield call(addConnection, payload);
    },
    *testConnection({ payload }, { call }){
      const response = yield call(testConnection, payload);
      return response;
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        //callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
        console.info(payload)
        let flag = Object.keys(payload).length === 1;
        console.info(flag);
        callback = Object.keys(payload).length === 1 ? removeFakeList : addConnection;
      } else {
        callback = addConnection;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *removeConnection({ payload }, { call, put }){
      const response = yield call(removeFakeList, payload); // post
      return response;
    },

  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        current:action.payload.current,
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

    addConnection(param){
      return '';
    },
    testConnection(action){
      return action;
    },
    removeConnection(action){
      return action;
    },
  },
};

export default Model;
