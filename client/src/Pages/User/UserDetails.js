import React, { useContext } from 'react';
import classes from './User.module.css';
import UserContext from '../../store/User-Context';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const userCtx = useContext(UserContext);

  return (
    <div className={classes['user-info']}>
      <span className={classes['user-info__field']}>NAME :</span>
      <span>{userCtx.user.name}</span>
      <span className={classes['user-info__field']}>EMAIL :</span>
      <span>{userCtx.user.email}</span>
      <div className={classes['user-info__btn']}>
        <Link to="/user/changePassword">
          <button type="button">CHANGE PASSWORD</button>
        </Link>
        <Link to="/notebooks">
          <button type="button">BACK</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
