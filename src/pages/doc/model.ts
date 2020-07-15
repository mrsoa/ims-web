import { AnyAction, Reducer } from "redux";

import { EffectsCommandMap } from "dva";
import { ApiContentModel } from "./data.d";
import { saveApiContent } from "./service";

export interface StateType {
  list: ApiContentModel[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: StateType) => T) => T;
  }
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: "apiContent",

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(saveApiContent, payload);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
