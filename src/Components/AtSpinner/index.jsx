import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const AtSpinner = props => {
  const { className, size = "lg" } = props;
  return <div className={`spinner-border spinner-border-${size} ${className}`}></div>;
};
const AtSpinnerOverlay = props => {
  const { show, className='' } = props;
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    render && (
      <div
        className={classNames(`at-spinner-overlay`, className)}
        style={{
          animation: `${show ? "fadeIn 0.25s" : "fadeOut 0.5s"} `
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {show && <AtSpinner></AtSpinner>}
      </div>
    )
  );
};
AtSpinner.propTypes = {
  className: PropTypes.string
};
AtSpinner.defaultProps = {
  className: ""
};
// const DebouncedAtSpinnerOverlay = debounceRender(AtSpinnerOverlay, 1000);

export { AtSpinner, AtSpinnerOverlay };
