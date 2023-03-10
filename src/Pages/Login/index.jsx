import netflixLogo from "../../images/netflix-logo.png";
import imgBackGround from "../../images/netflix-background.jpg";
import "./login.scss";
import { useEffect, useState } from "react";
import { httpClient } from "../../httpClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setCurrentUser, setSessin_id } from "../../Store/index";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const sessinId = useSelector((state) => state.app.sessinId);
  const userToken = useSelector((state) => state.app.token);
  const navigate = useNavigate();

  const Confirm = () => {
    userToken &&
      window
        .open(`https://www.themoviedb.org/authenticate/${userToken}`)
        .focus();
    if (
      window.confirm("Please authenticate the user for authorization !") == true
    ) {
      httpClient
        .post("/authentication/session/new", {
          request_token: userToken,
        })
        .then((response) => {
          dispatch(setSessin_id(response.data.session_id));
          navigate("/");
        })
        .catch(() =>
          alert("Can not login. Please check your account and password !")
        );
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    httpClient.get("authentication/token/new").then((response) => {
      localStorage.setItem("userToken", response.data.request_token);
      dispatch(setToken(response.data.request_token));
    });
  }, []);

  const LoginAccount = (e) => {
    e.preventDefault();
    Confirm();
  };
  return (
    <div className="login-page">
      <div className="login-header-wrapper">
        <div className="login-header">
          {" "}
          <div className="header-logo">
            <Link to="/">
              <img src={netflixLogo} alt="" />
            </Link>
          </div>
          <div className="header-group-right"></div>
        </div>
      </div>
      <div className="image-background">
        <img src={imgBackGround} alt="" />
      </div>
      <div className="login-body">
        <form action="">
          <div className="login-form-title">????ng nh???p</div>
          <input
            className="login-email-or-phone"
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="login-password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" onClick={(e) => LoginAccount(e)}>
            ????ng nh???p
          </button>
          <div className="group-login-support">
            <div className="login-remember">
              {" "}
              <input
                style={{ accentColor: "white" }}
                type="checkbox"
                name=""
                id=""
              />{" "}
              Ghi nh??? t??i
            </div>
            <span>B???n c???n gi??p ??????</span>
          </div>

          <div className="login-to-register">
            <p>
              B???n m???i tham gia Netflix?{" "}
              <Link to="/register">????ng k?? ngay.</Link>
            </p>
          </div>
          <p>
            Trang n??y ???????c Google reCAPTCHA b???o v??? ????? ?????m b???o b???n kh??ng ph???i l??
            robot <a href=""> T??m hi???u th??m.</a>
          </p>
        </form>
      </div>
      <div className="login-footer">
        <div className="footer-details">
          <div className="login-footer-title">
            B???n c?? c??u h???i? Li??n h??? v???i ch??ng t??i.
          </div>
          <ul className="footer-question-list">
            <li className="footer-question-item">C??u h???i th?????ng g???p</li>
            <li className="footer-question-item">Trung t??m tr??? gi??p</li>
            <li className="footer-question-item">T??i kho???n</li>
            <li className="footer-question-item">Trung t??m ??a ph????ng ti???n</li>
            <li className="footer-question-item">Quan h??? v???i nh?? ?????u t??</li>
            <li className="footer-question-item">Vi???c l??m</li>
            <li className="footer-question-item">C??c c??ch xem</li>
            <li className="footer-question-item">??i???u kho???n s??? d???ng</li>
            <li className="footer-question-item">Quy???n ri??ng t??</li>
            <li className="footer-question-item">T??y ch???n cookie</li>
            <li className="footer-question-item">Th??ng tin doanh nghi???p</li>
            <li className="footer-question-item">Li??n h??? v???i ch??ng t??i</li>
            <li className="footer-question-item">Ki???m tra t???c ?????</li>
            <li className="footer-question-item">Th??ng b??o ph??p l??</li>
            <li className="footer-question-item">LCh??? c?? tr??n Netflix</li>
          </ul>
          <div className="footer-language-picker">Ti??ng Vi???t</div>
          <div className="login-footer-subtitle">Netflix Vi???t Nam</div>
        </div>
      </div>
    </div>
  );
};
