import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastWrapper } from "./styles";

export const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime, animation } = props;
  const [list, setList] = useState([toastList]);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <ToastWrapper animation={animation}>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{
              backgroundColor: toast.backgroundColor,
              padding: toast.toastPadding,
            }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="notification-image">
              <img src={toast.icon} />
            </div>
            <div>
              <p
                className="notification-title"
                style={{
                  color: toast.titleColor,
                }}
              >
                {toast.title}
              </p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </ToastWrapper>
  );
};

Toast.defaultProps = {
  position: "bottom-right",
  autoDelete: true,
  autoDeleteTime: 3000,
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.string,
  autoDeleteTime: PropTypes.number,
  toastPadding: PropTypes.string,
  animation: PropTypes.string,
};