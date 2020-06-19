import { Effect } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

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
  },
  reducers: {

  },
};

export default Model;
