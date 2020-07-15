import { Effect, Reducer } from "umi";
import {
  addFakeList,
  queryFakeList,
  removeFakeList,
  updateFakeList,
  apiList,
} from "./service";

import { BasicListItemDataType } from "./data.d";

export interface StateType {
  list: BasicListItemDataType[];
  pageSize: number;
  currentPage: number;
  total: number;
}

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
  namespace: "apisAndApisList",

  state: {
    list: [],
    pageSize: 10,
    currentPage: 1,
    total: 20,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log("payload", payload);
      const response = yield call(queryFakeList, payload);
      const response2 = yield call(apiList, payload);
      console.log(response);
      yield put({
        type: "queryList",
        //payload: Array.isArray(response) ? response : [],
        payload: response2.data,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: "appendList",
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback =
          Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: "queryList",
        payload: response,
      });
    },
    *apiList({ payload }, { call, put }) {
      const response = yield call(apiList, payload);
      console.log(response);
      yield put({
        type: "queryList",
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(action);
      return {
        ...state,
        list: action.payload,
        // list: action.payload.data,
        // pageSize: action.payload.pageSize,
        // currentPage: action.payload.current,
        // total: action.payload.total,
      };
    },
    appendList(state = { list: [] }, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    apiList(state, action) {
      console.log("state", state);
      console.log("action", action.payload);
      return {
        ...state,
        list: action.payload,
        // page: {
        //   pageSize: 1,
        //   current: 10,
        // },
      };
    },
  },
};

export default Model;
