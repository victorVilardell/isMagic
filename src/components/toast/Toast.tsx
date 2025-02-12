import React from "react";
import "./Toast.scss";

interface ToastProps {
  message: string;
  type: string;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
