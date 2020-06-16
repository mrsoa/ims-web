import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { CompnayModel } from './data.d';
import { queryFakeList, saveCompany } from './service';

export interface StateType {
  list: CompnayModel[];
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
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'company',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response : [],
      });
    },
    *saveCompany({ payload }, { call, put }){
      const saveResponse = yield call(saveCompany, payload);

      if(saveResponse.success){
        const queryQresponse = yield call(queryFakeList, payload);
        yield put({
          type: 'queryList',
          payload: Array.isArray(queryQresponse.data) ? queryQresponse : [],
        });
      }
      
    },

  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    saveCompany(state, action){
      return {
        ...state,
        //done:action.payload.success,
      };
    }

  },
};

export default Model;
