import React, { useContext, useState } from 'react';
import classes from './User.module.css';
import { Redirect } from 'react-router-dom';
import UserContext from '../../store/User-Context';
import userInfo from '../../images/user-info.svg';
import ChangePassword from './ChangePassword';

const User = () => {
  const [isClicked, setIsClicked] = useState(false);
  const userCtx = useContext(UserContext);

  if (!userCtx.isLoggedIn) return <Redirect to="/login" />;

  const changePassBtnHandler = () => {
    setIsClicked(true);
  };

  const cancelBtnHandler = () => {
    setIsClicked(false);
  };

  return (
    <div className={`${classes['user-profile'] + ' user'}`}>
      <div className={classes['svg-container']}>
        <img src={userInfo} alt="user-info" className={classes['user-svg']} />
      </div>
      <div className={classes['user-info__container']}>
        {!isClicked && (
          <div className={classes['user-info']}>
            <span className={classes['user-info__field']}>NAME :</span>
            <span>{userCtx.user.name}</span>
            <span className={classes['user-info__field']}>EMAIL :</span>
            <span>{userCtx.user.email}</span>
            <div className={classes['user-info__btn']}>
              <button type="button" onClick={changePassBtnHandler}>
                CHANGE PASSWORD
              </button>
            </div>
          </div>
        )}
        {isClicked && <ChangePassword cancelBtn={cancelBtnHandler} />}
      </div>
    </div>
  );
};

export default User;
