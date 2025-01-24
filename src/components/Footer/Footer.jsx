
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/contact" className="footer__link">
          КОНТАКТЫ
        </Link>
        <p className="footer__text">
          © 2023 Путеводитель по Сочи. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
