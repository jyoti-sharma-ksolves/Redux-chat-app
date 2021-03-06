import React from 'react';
import moment from 'moment';
import Header from '../Components/Header';

class ChatPanel extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      value: '',
      receiver_id: '',
      chatData: [],
    };
  }

  handleSendMessage = () => {
    const sender_id = this.props.user.id;
    const receiver_id = this.props.receiver;
    const {value} = this.state;

    if (value && value.length < 200) {
      fetch ('http://localhost:8000/api/send-message', {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify ({
          sender_id,
          receiver_id,
          message: value,
          created_at: moment(new Date()).format(),
        }),
      })
        .then (response => response.json ())
        .catch (e => {
          console.log (e);
        });
    }
    this.setState ({value: ''});
  };

  handleOnChange = e => {
    this.setState ({value: e.target.value});
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleSendMessage ();
    }
  };

  timeFor = (time) => {
    const datef = new Date(time).toString();
    const dateArray = datef.split(' ');
    const hours = moment(new Date(time)).format('h:mm a');

    return {
      date: dateArray[1],
      month: dateArray[2],
      hours
    }
  }

  render () {
    const {user, chatData, receiver, userList} = this.props;
    return (
      <div>
        <div className="header">
          <Header user={user} selectedUser={userList} receiver={receiver} history={this.props.history} />
        </div>
        <div className="mesgs">
          <div className="msg_history">
            {chatData.length > 0 &&
              chatData.map ((item, index) => {
                return item.sender_id === user.id
                  ? <div className="outgoing_msg" key={index}>
                      <div className="sent_msg word-wrap">
                        <p>{item.body}</p>
                        <span className="time_date">
                         {this.timeFor(item.created_at).date} {this.timeFor(item.created_at).month} | {this.timeFor(item.created_at).hours}
                        </span>
                      </div>
                    </div>
                  : <div className="incoming_msg" key={index}>
                      <div className="incoming_msg_img">
                        {' '}
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="profile" />
                        {' '}
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg word-wrap">
                          <p>{item.body}</p>
                          <span className="time_date">
                            {this.timeFor(item.created_at).date} {this.timeFor(item.created_at).month} | {this.timeFor(item.created_at).hours}
                          </span>
                        </div>
                      </div>
                    </div>;
              })}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input
                type="text"
                className="write_msg"
                placeholder="Type a message"
                value={this.state.value}
                onChange={this.handleOnChange}
                onKeyPress={this.handleKeyPress}
              />
              <button
                className="msg_send_btn"
                type="button"
                onClick={this.handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPanel;
