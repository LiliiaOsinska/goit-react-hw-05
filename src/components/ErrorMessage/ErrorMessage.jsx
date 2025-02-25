import s from "../ErrorMessage/ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div className={s.error}>
      <h2>Something went wrong! Try again later...</h2>
    </div>
  );
};

export default ErrorMessage;
