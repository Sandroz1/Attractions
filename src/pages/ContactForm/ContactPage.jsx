import { useState, useEffect } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import './ContactPage.scss';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <h1 className="contact-page__title">
          Добро пожаловать в Путеводитель!
        </h1>
        <p className="contact-page__subtitle">
          Мы поможем вам найти лучшие места для путешествий и отдыха.
        </p>
      </header>

      <main className="contact-page__main">
        <section className="contact-page__about">
          <h2>О нас</h2>
          <p>
            Путеводитель — это ваш надежный помощник в мире путешествий. Мы
            предлагаем уникальные маршруты, полезные советы и актуальную
            информацию о самых интересных местах.
          </p>
        </section>

        <section className="contact-page__info">
          <div className="contact-page__info-item">
            <h2>Адрес</h2>
            <p>г. Москва, ул. Путеводная, д. 123</p>
          </div>
          <div className="contact-page__info-item">
            <h2>Телефон</h2>
            <p>+7 (999) 123-45-67</p>
          </div>
          <div className="contact-page__info-item">
            <h2>Email</h2>
            <p>info@putevoditel.ru</p>
          </div>
        </section>

        <button className="contact-page__button" onClick={openModal}>
          Написать Нам
        </button>
      </main>

      {/* Модальное окно с формой */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal__close-button" onClick={closeModal}>
              &times;
            </button>
            <ContactForm onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
