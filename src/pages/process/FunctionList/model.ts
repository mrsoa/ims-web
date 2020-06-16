import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

import { TableListItem } from './data.d';
import {getProFunctionList, processUnitList} from "./service";
import {BasicListItemDataType} from "@/pages/process/ProcessList/data";

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
    namespace: 'FunctionList',

    state: {
        list: [],
        currentPage:1,
        pageSize:10,
        total:1,
    },

    effects: {
        *getProFunctionList({ payload }, { call, put }) {
            const response = yield call(getProFunctionList, payload);
            yield put({
                type: 'getProFunctionList',
                payload: response,
            });
        },
        *processUnitList({ payload }, { call, put }) {
            const response = yield call(processUnitList, payload);
            yield put({
                type: 'processUnitList',
                payload: response,
            });
        },
        *deleteProFunction({ payload }, { call, put }){
            const response = yield call(deleteProFunction, payload);
            yield put({
                type: 'getProFunctionList',
                payload: response,
            });
        }
    },

    reducers: {
        getProFunctionList(state, action) {
            return {
                ...state,
                list:Array.isArray(action.payload.data) ? action.payload.data : [],
            };
        },
        processUnitList(state, action) {
            return {
                ...state,
                list:Array.isArray(action.payload.data) ? action.payload.data : [],
            };
        },
        deleteProFunction(state, action){
            return {
                ...state,
            };
        }
    },
};

export default Model;
