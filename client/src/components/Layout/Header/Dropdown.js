import { useContext } from 'react';
import classes from './Dropdown.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import UserContext from '../../../store/User-Context';

const Dropdown = () => {
  const userCtx = useContext(UserContext);

  const logoutHandler = () => {
    userCtx.logout();
  };

  return (
    <div className={classes.dropdown}>
      <IconContext.Provider value={{ color: 'white', size: '1.2rem' }}>
        <button className={classes['dropdown-btn']}>
          <FaRegUserCircle />
        </button>
      </IconContext.Provider>
      <div className={classes['dropdown-menu']}>
        <Link to="/user">User Profile</Link>
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dropdown;
