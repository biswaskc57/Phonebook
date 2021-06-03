const Notification = ({ message, addMessage }) => {
  if (message === null && addMessage === null) {
    return null;
  } else if ((message !== null, addMessage === null))
    return <div className="error">{message}</div>;
  else if (addMessage !== null && message === null)
    return <div className="addMessage">{addMessage}</div>;
};
export default Notification;
