import { useState } from 'react';
import './ContactForm.scss';

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formObj = {
      name: formData.name,
      message: formData.message,
      number: formData.number,
    };
    const storedData = JSON.parse(localStorage.getItem('input')) || [];
    storedData.push(formObj);
    localStorage.setItem('input', JSON.stringify(storedData));
    setFormData({ name: '', message: '', number: '' });
    onClose(); // Закрываем модальное окно после отправки
  };

  return (
    <div className="main__form">
      <h2 className="main__form__title">Контактная форма</h2>
      <input
        type="text"
        className="main__form__input main__form__name"
        placeholder="Как к вам обращаться"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        placeholder="Введите сообщение"
        className="main__form__input main__form__message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <input
        placeholder="Контактный номер телефона"
        type="text"
        className="main__form__input main__form__number"
        name="number"
        value={formData.number}
        onChange={handleChange}
      />
      <div className="main__form__send">
        <button className="main__form__send-form" onClick={handleSubmit}>
          Отправить форму
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
