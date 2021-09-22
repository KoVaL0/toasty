import React from "react"
import { Toast } from "../components/Toast/Toast"
import { ToastContainer } from "../components/Toast/ToastContainer"
import errorIcon from "../assets/error.svg"
import infoIcon from "../assets/info.svg"
import warningIcon from "../assets/warning.svg"
import succsessIcon from "../assets/success.svg"
import {
  WHITE,
  GREEN,
  RED,
  PURPLE,
  BLACK,
  YELOW,
  GREY,
  SUCCESS,
  ERROR, 
  INFO, 
  WARNING,
  SUCCESS_TITLE,
  WARNING_TITLE,
  ERROR_TITLE,
  INFO_TITLE,
  CUSTOM_TITLE,
} from "../constants/index"


let toastList = []

class _Toast {
  constructor(toastList) {
    if(_Toast.singleton){
      throw new Error('Singleton classes cant be instantiated more than once.')
    }
    _Toast.singleton = this
    this.toastList = toastList
    this.showToast = this.showToast
  }

  getId() {
    return Math.floor(Math.random() * 101 + 1)
  }

  getTitle(properties) { 
    switch (properties.type) {
      case SUCCESS:
        return SUCCESS_TITLE;
      case ERROR:
        return ERROR_TITLE;
      case INFO:
        return INFO_TITLE;
      case WARNING:
        return WARNING_TITLE;
      default:
        return CUSTOM_TITLE;
    }
  }

  getTitleColor(properties) {
    switch (properties.type) {
      case SUCCESS:
        return WHITE;
      case ERROR:
        return WHITE;
      case INFO:
        return WHITE;
      case WARNING:
        return BLACK;
      default:
        return BLACK;
    }
  }

  getBackgroundColor(properties) {
    switch (properties.type) {
      case SUCCESS:
        return GREEN;
        break;
      case ERROR:
        return RED;
        break;
      case INFO:
        return PURPLE;
        break;
      case WARNING:
        return YELOW;
        break;
      default:
        return GREEN;
        break;
    }
  }

  getIcon(properties) {
    switch (properties.type) {
      case SUCCESS:
        return succsessIcon;
      case ERROR:
        return errorIcon;
      case INFO:
        return infoIcon;
      case WARNING:
        return warningIcon;
      default:
        return succsessIcon;
    }
  }

  getProperty(description, properties) {
    return {
      ...properties,
      id: properties.toastId || this.getId(),
      description: description || 'Message!',
      toastPadding: properties.padding || '',
      title: this.getTitle(properties),
      titleColor: this.getTitleColor(properties),
      backgroundColor: this.getBackgroundColor(properties),
      icon: this.getIcon(properties),
    }
  }

  showToast(description, properties) {
    if (toastList.length < 3) toastList = [...toastList, this.getProperty(description, properties)]

    return (
      <ToastContainer>
        <Toast
          toastList={toastList}
          position={properties.position}
          autoDelete={properties.autoDelete}
          autoDeleteTime={properties.delay}
          animation={properties.animation}
        />
      </ToastContainer>
    )
  }
}

export const toast = new _Toast(toastList)




