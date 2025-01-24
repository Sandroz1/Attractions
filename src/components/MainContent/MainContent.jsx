import { useState } from 'react';
import Slider from '../Slider/Slider';
import './MainContent.scss';

const MAP_URLS = {
  first:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d180.60749965211417!2d39.72821505427165!3d43.5915483276101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f5cbdae6c31845%3A0x704a5ee626e0d7b9!2z0KHRgtCw0L3RhtC40Y8g0KHQvtGH0Lg!5e0!3m2!1sru!2sru!4v1736750347134!5m2!1sru!2sru',
  second:
    'https://www.google.com/maps/embed?pb=!4v1736749814402!6m8!1m7!1s2CaSEypSP1fdjvWQbbWeDw!2m2!1d43.5915483276101!2d39.72821505427165!3f111.54830015641073!4f-9.069223127192657!5f0.7820865974627469',
};

const LINKS = [
  {
    text: 'Парк Дендрарий',
    url: 'https://www.tripadvisor.ru/Attraction_Review-g298536-d307451-Reviews-Arboretum_Park-Sochi_Greater_Sochi_Krasnodar_Krai_Southern_District.html',
  },
  { text: 'Сочи Парк', url: '' },
  { text: 'Смотровые площадки и башни', url: '' },
  { text: 'Прогулки по живописной местности', url: '' },
];

const MainContent = () => {
  const [mapView, setMapView] = useState('first');

  const toggleMapView = () =>
    setMapView((prevView) => (prevView === 'first' ? 'second' : 'first'));

  return (
    <main className="main-content">
      <Slider />

      <div className="main-content__info">
        <h1 className="main-content__title">Путеводитель по Сочи</h1>
        <p className="main-content__text">
          Посмотрите достопримечательности и развлечения, которые нельзя
          пропустить:
        </p>
        <div className="audio-player">
          <audio controls>
            <source
              src="../public/assets/audio/sochiAudio.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>
        <div className="main-content__links">
          {LINKS.map(
            (link, index) =>
              link.url && (
                <a
                  key={index}
                  href={link.url}
                  className="main-content__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              )
          )}
        </div>
      </div>
      <div className="main-content__map">
        <button className="main-content__map-button" onClick={toggleMapView}>
          Сменить вид
        </button>
        <iframe
          className="map-iframe"
          src={MAP_URLS[mapView]}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Карта Сочи"
        />
      </div>
    </main>
  );
};

export default MainContent;
