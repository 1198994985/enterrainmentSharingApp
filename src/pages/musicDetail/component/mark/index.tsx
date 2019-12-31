// @ts-nocheck
import React from "react";
import {
  Comment,
  Tooltip,
  List,
  Avatar,
  Form,
  Button,
  Input,
  Card
} from "antd";
import moment from "moment";
import "./index.less";

const { TextArea } = Input;

const CommentList = ({ comments = [] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);
interface ImarkProps {
  mark: markItem[] | undefined;
}

export interface markItem {
  id: string | number;
  author: string;
  content: string;
  datetime: string;
  avater: string;
}

class MarkAera extends React.PureComponent {
  state = {
    comments: [],
    submitting: false,
    value: ""
  };
 
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });
    console.log("this.props.onAddComment", this.props.onAddComment);
    this.props.onAddComment(this.state.value);
    setTimeout(() => {
      this.setState({
        submitting: false,

      });
    }, 300);
  };
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const { mark } = this.props;
    return (
      // <div className="mark-aera  card-white">

      // </div>
      <Card
        size="small"
        title="💬 评论"
        style={{ marginTop: 5, width: "100%", borderRadius: 8 }}
      >
        <Comment
          avatar={
            <Avatar
              src="https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG"
              alt=""
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        {mark.length > 0 && <CommentList comments={mark} />}
      </Card>
    );
  }
}


export default MarkAera;
