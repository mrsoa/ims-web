import React from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Row, Col,Tree, Card,Icon} from "antd";

const { TreeNode } = Tree;

class Company extends React.Component{

  state = {
    treeData: [
      { title: '蚁安居（天津）网络技术有限公司', key: '0',icon:'bank'},
      { title: '爱康鼎天津有限公司', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],
  };

  onLoadData = (treeNode:any) =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} icon={item.icon}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item}  icon={<Icon type="carry-out" />}/>;
    });


  render(){
    return(
      <PageHeaderWrapper

      >
        <Row>
          <Col span={8}>
            <Card>
              <Tree loadData={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree>
            </Card>
        </Col>
          <Col span={16}>content</Col>
        </Row>
      </PageHeaderWrapper>
    )
  }

}

export default Company;
