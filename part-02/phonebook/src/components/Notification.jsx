const baseStyles = {
  width: 'fit-content',
  padding: '0.5em',
  border: '2px solid black',
  borderRadius: '0.5em',
  fontWeight: 'bold'
};

const Notification = ({ message, style }) => {
  if (!message || message === '') return;
  return (<div style={style} className="notification">{message}</div>)
};

const SuccessMessage = ({ message }) => {
  const successStyle = {
    ...baseStyles,
    borderColor: 'green',
    color: 'green',
    backgroundColor: 'rgba(0, 255, 0, 0.1)'
  };

  return (<Notification message={message} style={successStyle} />);
};

const ErrorMessage = ({ message }) => {
  const errorStyle = {
    ...baseStyles,
    borderColor: 'red',
    color: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.1)'
  };

  return (<Notification message={message} style={errorStyle} />);
}

export {
  SuccessMessage,
  ErrorMessage
};