import React from 'react';
import classes from './WelcomePage.module.css';
import landingSvg from '../../images/landingSvg.svg';

const WelcomePage = () => {
  return (
    <React.Fragment>
      <div className="landing">
        <div className={classes['landing-svg__container']}>
          <img src={landingSvg} alt="notes illustration" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
