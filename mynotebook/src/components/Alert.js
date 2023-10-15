import React, { useState, useEffect } from 'react';

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1500); // 1500 milliseconds (1.5 seconds)

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  var typeerr = props.type
  return (
    <div>
      {showAlert && (
        <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
          <strong>{typeerr==="warning"?"error":props.type}:</strong> {props.msg}.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
}

export default Alert;
