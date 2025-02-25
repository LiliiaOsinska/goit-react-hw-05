import s from "../BaskBtn/BaskBtn.module.css";
import { Navigate } from "react-router-dom";

const BaskBtn = (navigate) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className={s.bask_btn}>
        <button onClick={() => navigate("/")}>Go Bask</button>
      </div>
    </>
  );
};

export default BaskBtn;
