import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/system/saveJobDefine', {
    method: 'POST',
    data: params,
  });
}

export async function getFunctionSelectOptions(search: string) {
  return request('/system/getFunctionSelectOptions', {
    method: 'POST',
    params: { search },
  });
}

