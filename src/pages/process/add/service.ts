import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/process/addProcessUnit', {
    method: 'POST',
    data: params,
  });
}
