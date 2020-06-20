import { Effect } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm, getFunctionSelectOptions } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitAdvancedForm: Effect;
  };
  reducers: any;
}

const Model: ModelType = {
  namespace: 'jobAndJobDefineAdd',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *getFunctionSelectOptions({ payload }, { call }) {
      const response = yield call(getFunctionSelectOptions, payload);
      yield put({
        type: 'getFunctionSelectOptions',
        payload: Array.isArray(response) ? response : [],
      });
    }
  },
  reducers: {
    getFunctionSelectOptions(state, action) {
      return {
        list: Array.isArray(action.payload.data) ? action.payload.data : [],
      };
    },
  },
};

export default Model;
