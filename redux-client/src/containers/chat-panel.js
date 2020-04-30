import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { textChange } from '../actions/common-actions'
import { getUserInfo, getUserList, getMessage, updateSender, updateReceiver } from '../actions/chat-room';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import UserList from '../components/UserList';

class ChatPanel extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        console.log(this.props, '**********')
        const {user, chatData, receiver, userList} = this.props;
        return (
          <div>
            <div className="header">
              {/* <Header user={user} selectedUser={userList} receiver={receiver} history={this.props.history} /> */}
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

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatPanel);