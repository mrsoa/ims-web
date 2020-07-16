import React, { Component } from "react";
import { Menu, Layout, Switch, message } from "antd";
import { Router, Route, Link, BrowserRouter } from "react-router-dom";
import Detail from "../doc/detail";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import request from "@/utils/request";

export default class OpenApi extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    openKeys: ["sub1"],
    openApis: [],
  };

  componentDidMount() {
    request("/system/apiContent/findAllApiContent", {
      method: "POST",
      data: {},
    }).then(
      (res) => {
        console.log(res);
        if (res) {
          if (res.success) {
            const apis = res.data;
            console.log(apis);
            this.setState({ openApis: apis });
          }
        }
        console.log(this.state);
      },
      (err) => {
        message.error("保存接口文档信息失败");
      }
    );
  }

  getContent = () => {
    return this.state.openApis.map((item) => {
      console.info(item);
      <Menu.Item key="0">
        <Link to="/dddd/454545">详情1</Link>
      </Menu.Item>;
    });
    console.log("方法成功执行");
    // return (
    //   <Menu.Item key="0">
    //     <Link to="/dddd/454545">详情1</Link>
    //   </Menu.Item>
    // );
  };

  onOpenChange = (openKeys) => {
    console.log(openKeys);
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  // 获取api列表

  render() {
    console.log(this.state);

    const options = this.state.openApis.map((item) => (
      <Menu.Item key={item.id}>
        <Link to={`/dddd/${item.id}`}>详情</Link>
      </Menu.Item>
    ));
    return (
      <Layout>
        <BrowserRouter>
          <Sider>
            <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{ width: 200 }}
            >
              {options}
            </Menu>
          </Sider>

          <Content>
            <Route path="/dddd/:id" component={Detail}></Route>
          </Content>
        </BrowserRouter>
      </Layout>
    );
  }
}
