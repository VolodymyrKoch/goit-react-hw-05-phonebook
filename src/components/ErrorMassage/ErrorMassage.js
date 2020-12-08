import React from 'react';

import classes from './ErrorMassage.module.css';

export default function ErrorMassage({ children }) {
  return <div className={classes.errorMassage}>{children}</div>;
}
