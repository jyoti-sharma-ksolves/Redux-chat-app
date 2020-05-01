import React from 'react';

const Header = (props) => {
    const { user, receiverInfo } = props;
    
    return (
        <div>
          {receiverInfo && receiverInfo.length > 0 && <div className="inline-display mr">{receiverInfo[0].first_name}{' '}{receiverInfo[0].last_name}</div>}
          {user && user.first_name &&
          <React.Fragment>
            <div className="inline-display">{user.first_name}{' '}{user.last_name}
            </div>

            <div className="user_img">
              <div className="profile_header"
                // onClick={this.showDropdown}
              >
                {user.first_name.charAt(0).toUpperCase()}
              </div>
              {/* {this.state.show &&
                <div id="myDropdown" className="dropdown-content">
                  <div onClick={this.getSelectedValue} >Logout</div>
                </div>
              } */}
          </div>
        </React.Fragment>
        }  
        </div>
      );
}

export default Header;