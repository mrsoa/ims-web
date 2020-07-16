import React, { Component } from "react";
import { Card, message } from "antd";
import request from "@/utils/request";

export default class OpenApiDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      api: {},
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    const id = this.props.match.params.id;
    this.setState({ id });
    this.getDetail(this.props.match.params.id);
  }

  getDetail = (id: number) => {
    request("/system/apiContent/findApiContentById", {
      method: "POST",
      data: { id },
    }).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success) {
            const api = res.data;
            console.log(api);
            this.setState({ api });
          }
        }
        console.log(this.state);
      },
      (err) => {
        message.error("保存接口文档信息失败");
      }
    );
    //return response;
  };

  render() {
    return (
      <div>
        <Card>
          这是详情页面
          <br />
          路由参数为：{this.state.id}
        </Card>
      </div>
    );
  }
}
