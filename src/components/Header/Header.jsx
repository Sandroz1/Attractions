import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal.jsx/Modal";
import "./Header.scss";
import { UserContext } from "../UserContext/UserContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const login = e.target.elements.login.value;
    const password = e.target.elements.password.value;

    try {
      const checkResponse = await fetch(
        `https://672885dc270bd0b97555ee35.mockapi.io/users`
      );
      const allUsers = await checkResponse.json();

      const existingUsers = allUsers.filter((user) => user.login === login);
      console.log("Existing users:", existingUsers);

      if (existingUsers.length > 0) {
        setError("Пользователь с таким логином уже существует");
        return;
      }

      const createResponse = await fetch(
        "https://672885dc270bd0b97555ee35.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, password, IsAdmin: false }),
        }
      );
      console.log("Create response:", createResponse);

      if (createResponse.ok) {
        const newUser = await createResponse.json();
        console.log("New user:", newUser);
        setUser(newUser);
        alert("Регистрация прошла успешно!");
        closeModal();
      } else {
        setError("Ошибка при регистрации. Попробуйте снова.");
      }
    } catch (err) {
      setError("Ошибка при регистрации. Попробуйте снова.");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const login = e.target.elements.login.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch(
        `https://672885dc270bd0b97555ee35.mockapi.io/users?login=${login}`
      );
      const users = await response.json();
      console.log("Users found:", users);

      if (users.length > 0 && users[0].password === password) {
        setUser(users[0]);
        alert("Вход выполнен успешно!");
        closeModal();
      } else {
        setError("Неверный логин или пароль");
      }
    } catch (err) {
      setError("Ошибка при входе. Попробуйте снова.");
      console.error(err);
    }
  };
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            src="/assets/image/logo-city-guide.png"
            alt="Логотип"
            className="header__logo-image"
          />
        </Link>

        <nav className={`header__nav ${menuOpen ? "active" : ""}`}>
          <Link to="/attractions" className="header__nav-link">
            ДОСТОПРИМЕЧАТЕЛЬНОСТИ
          </Link>
          {user ? (
            <div className="header__user-info">
              <span className="header__user-name">{user.login}</span>
              <button className="header__nav-button" onClick={handleLogout}>
                Выход
              </button>
            </div>
          ) : (
            <button className="header__nav-button" onClick={openModal}>
              Войти
            </button>
          )}
        </nav>
        <button
          className={`header__burger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <img src="./assets/image/burg 1.svg" alt="Меню" />
        </button>

        <div className={`header__mobile-menu ${menuOpen ? "active" : ""}`}>
          <Link
            to="/attractions"
            className="header__mobile-link"
            onClick={toggleMenu}
          >
            ДОСТОПРИМЕЧАТЕЛЬНОСТИ
          </Link>
          {user ? (
            <div className="header__user-info">
              <span className="header__user-name">{user.login}</span>
              <button
                className="header__mobile-login-button"
                onClick={handleLogout}
              >
                Выход
              </button>
            </div>
          ) : (
            <button className="header__mobile-login-button" onClick={openModal}>
              Войти
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="modal-title">
          {isLoginForm ? "Вход в систему" : "Регистрация"}
        </h2>
        {error && <p className="modal-error">{error}</p>}
        <form
          className="modal-form"
          onSubmit={isLoginForm ? handleLogin : handleRegister}
        >
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className="modal-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="modal-input"
            required
          />
          <button type="submit" className="modal-button">
            {isLoginForm ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <button className="modal-toggle-button" onClick={toggleForm}>
          {isLoginForm
            ? "Нет аккаунта? Зарегистрируйтесь"
            : "Уже есть аккаунт? Войдите"}
        </button>
      </Modal>
    </header>
  );
};

export default Header;
