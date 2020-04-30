import React from 'react';
import moment from 'moment';

const ChatPanel = (props) => {
    console.log(props, props.onChange, '%%%%%%%%%%%%%')
    const chatData = props.messages || [];
    const user = props.userInfo;

    const timeFor = (time) => {
        const datef = new Date(time).toString();
        const dateArray = datef.split(' ');
        const hours = moment(new Date(time)).format('h:mm a');
    
        return {
          date: dateArray[1],
          month: dateArray[2],
          hours
        }
    } 

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
                           {timeFor(item.created_at).date} {timeFor(item.created_at).month} | {timeFor(item.created_at).hours}
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
                              {timeFor(item.created_at).date} {timeFor(item.created_at).month} | {timeFor(item.created_at).hours}
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
                  value={props.messageToSend}
                  onChange={(e) => {props.onChange(e)}}
                  onKeyPress={(e) => {props.onKeyPress(e)}}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={(e) => {props.buttonClick()}}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ChatPanel; 