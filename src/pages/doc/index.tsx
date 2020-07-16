import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button, Card, message } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import request from "@/utils/request";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

class ApiContent extends Component {
  handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  onFinish = (values: any) => {
    values.apiContent = values.content.level.content;
    delete values.content;

    request("/system/apiContent/saveApiContent", {
      method: "POST",
      data: values,
    }).then(
      (res) => {
        if (res === undefined) {
          message.error("保存接口文档失败");
          return;
        }
        if (res.success) {
          message.success("保存接口文档成功");
        } else {
          message.error("保存接口文档信息失败");
        }
      },
      (err) => {
        message.error("保存接口文档信息失败");
      }
    );
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <PageHeaderWrapper>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item label="接口名称" name="apiName">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Editor
              apiKey="82mud14g3etrt6lo4komv1bpt59ju4xgqv1z9ys32nfjlxur"
              initialValue="<p>Initial content</p>"
              init={{
                height: 500,
                menubar: false,
                selector: "textarea",
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount codesample",
                  "table advtable",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | code | codesample table",
              }}
              onChange={this.handleEditorChange}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    );
  }
}

export default ApiContent;
