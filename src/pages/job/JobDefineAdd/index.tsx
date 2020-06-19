import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';

import React, { FC, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
//import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';
import { connect } from 'dva';

type InternalNamePath = (string | number)[];

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  jobName: '定时任务编码',
  functionId: '执行功能',
  triggerType: '触发类型',
  description: '定时任务描述',
};

const tableData: any = [
  {
    key: `NEW_TEMP_ID_1`,
    paramName: 'siteCode',
    paramValue: 'LMS0001',
    paramType: 'string',
    paramIndex: 1,
    description: '服务平台',
  }
];

interface JobDefineAddProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const JobDefineAdd: FC<JobDefineAddProps> = ({
  submitting,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    console.log('执行了这里');
    console.log('values', values);
    dispatch({
      type: 'jobAndJobDefineAdd/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrappedComponentRef={(form) => this.formRef = form}
    >
      <PageHeaderWrapper content="此页面用于定义定时任务的已经定时任务的参数信息">
        <Card title="定时任务定义" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.jobName}
                name="jobName"
                rules={[{ required: true, message: '请输入定时任务编码' }]}
              >
                <Input placeholder="请输入定时任务编码" />
              </Form.Item>
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.functionId}
                name="functionId"
                rules={[{ required: true, message: '请选择功能' }]}
              >
                <Select placeholder="请选择功能">
                  <Option value="xiao">付晓晓</Option>
                  <Option value="mao">周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.triggerType}
                name="triggerType"
                rules={[{ required: true, message: '请选择JOB类型' }]}
              >
                <Select placeholder="请请选择JOB类型">
                  <Option value="job">JAVA</Option>
                  <Option value="procedure">存储过程</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.description}
                name="description"
                rules={[{ required: true, message: '定时任务描述' }]}
              >
                <Input placeholder="请输入定时任务描述" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="定时任务参数" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageHeaderWrapper>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['jobAndJobDefineAdd/submitAdvancedForm'],
}))(JobDefineAdd);
