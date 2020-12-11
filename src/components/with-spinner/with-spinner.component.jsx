import React from "react";

import {default as Spinners} from '../spinner/spinner.component'

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinners /> : <WrappedComponent {...otherProps} />;
  };

  return Spinner;
};

export default WithSpinner;
