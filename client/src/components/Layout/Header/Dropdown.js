import { useContext } from 'react';
import classes from './Dropdown.module.css';
import { FaRegUserCircle, FaRegUser } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GrLogout } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import UserContext from '../../../store/User-Context';

const Dropdown = () => {
  const userCtx = useContext(UserContext);

  const logoutHandler = () => {
    userCtx.logout();
  };

  return (
    <div className={classes.dropdown}>
      <button className={classes['dropdown-btn']}>
        <FaRegUserCircle />
      </button>
      <IconContext.Provider value={{ color: 'black', size: '1rem' }}>
        <div className={classes['dropdown-menu']}>
          <Link to="/user">
            <div className={classes['dropdown-menu-item']}>
              <FaRegUser />
              <button type="button">User Profile</button>
            </div>
          </Link>
          <div
            className={classes['dropdown-menu-item']}
            onClick={logoutHandler}
          >
            <GrLogout />
            <button type="button">Logout</button>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};
export default Dropdown;
