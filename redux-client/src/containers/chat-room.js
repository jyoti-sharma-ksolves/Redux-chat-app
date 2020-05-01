import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { changeMessage, failurMessage } from '../actions/common-actions'
import { getUserInfo, getUserList, getMessage, updateMessage, updateSender, updateReceiver, sendMessage } from '../actions/chat-room';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import UserList from '../components/UserList';
import ChatPanel from '../components/ChatPanel';
import moment from 'moment';

class ChatRoom extends React.Component {
    constructor (props) {
        super (props)
    }

    componentWillMount () {
        const id = JSON.parse(localStorage.getItem('document'));
        this.props.dispatch(getUserInfo(id));
        this.props.dispatch(updateSender(id));
    }

    componentDidMount () {
        const { sender_id } = this.props.userInfoReducer;
        this.props.dispatch(getUserList(sender_id));

        setInterval(() => {
           this.updateMessageInSetTimeOut(); 
        }, 3000)
        
    }
    
    updateMessageInSetTimeOut = () => {
        const {sender_id, receiver_id} = this.props.userInfoReducer;
        const url = `http://localhost:8000/api/receive-message?sender_id=${sender_id}&receiver_id=${receiver_id}`;

        fetch( url, {
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(jsonData => {
            if(jsonData.error) {
                return this.props.dispatch(failurMessage('Please try again!'));
            }
            else if (jsonData.message === 'Success') {
                return this.props.dispatch(updateMessage(jsonData.data));
            }
        })
        .catch(error => {
            console.error(error);
            return this.props.dispatch(failurMessage('Please try again!'));
        })

    }

    handleClick = (e, id) => {
        this.props.dispatch(updateReceiver(id));

        const {sender_id, receiver_id} = this.props.userInfoReducer;
        this.props.dispatch(getMessage(sender_id, receiver_id))
    }

    handleChange = (e) => {
        this.props.dispatch(changeMessage(e.target.value))
    }

    handleSubmit = () => {
        const time = moment(new Date()).format();
        const {sender_id, receiver_id, messageToSend} = this.props.userInfoReducer;
        this.props.dispatch(sendMessage(sender_id, receiver_id, messageToSend, time))
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.handleSubmit();
        }
    }

    render () {
        const {userList, userInfo, messages, sender_id, receiver_id, messageToSend} = this.props.userInfoReducer;
        return (
          <div className="container">
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">
                <div className="headind_chat">
                    <div className="recent_heading">
                      <h4>People</h4>
                    </div>
                    <div className="srch_bar">
                      <div className="stylish-input-group">
                        <input
                          type="text"
                          className="search-bar"
                        //   value={this.state.value}
                        //   onChange={this.handleChange}
                        //   onKeyPress={this.handleSearch}
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inbox_chat">
                    {userList.length > 0 && userList.map((item, index) => {
                        return <UserList
                                 item={item}
                                 onClick={this.handleClick}
                                 receiver_id={receiver_id}
                                 key={index}
                                />
                    })}
                  </div>
                </div>
                {/* <ChatPanel
                  user={user}
                  chatData={chatData}
                  userList={userList}
                  receiver={receiver_id}
                  history={this.props.history}
                /> */}
                <ChatPanel
                    messages={messages}
                    userInfo={userInfo}
                    onChange={this.handleChange}
                    messageToSend={messageToSend}
                    onKeyPress={this.handleKeyPress}
                    buttonClick={this.handleSubmit}
                    userList={userList}
                    receiver_id={receiver_id}
                />
              </div>
            </div>
          </div>
        );
      }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatRoom);