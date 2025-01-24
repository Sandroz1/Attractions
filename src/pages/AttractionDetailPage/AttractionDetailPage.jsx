import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { UserContext } from "../../components/UserContext/UserContext";
import { fetchData, updateData } from "../../api";
import "./AttractionDetailPage.scss";

const AttractionDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useContext(UserContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["attraction", id],
    queryFn: () =>
      fetchData(`https://672885dc270bd0b97555ee35.mockapi.io/repos/${id}`),
  });

  const addReviewMutation = useMutation({
    mutationFn: (newReview) =>
      updateData(`https://672885dc270bd0b97555ee35.mockapi.io/repos/${id}`, {
        ...data,
        reviews: [...(data.reviews || []), newReview],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["attraction", id]);
      setName("");
      setText("");
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) =>
      updateData(`https://672885dc270bd0b97555ee35.mockapi.io/repos/${id}`, {
        ...data,
        reviews: data.reviews.filter((review) => review.id !== reviewId),
      }),
    onSuccess: () => queryClient.invalidateQueries(["attraction", id]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim())
      return alert("Пожалуйста, заполните все поля.");
    addReviewMutation.mutate({ id: Date.now().toString(), name, text });
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const openModal = (image, index) => {
    setModalImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const navigateImage = (direction) => {
    const images = [data.img1, data.img2, data.img3];
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentImageIndex(newIndex);
    setModalImage(images[newIndex]);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="attraction-detail">
      <Link to="/attractions" className="attraction-detail__back">
        <img src="/assets/image/arrow-back.svg" alt="arrow-back" />
        Назад
      </Link>
      <div className="attraction-detail__container">
        <h1 className="attraction-detail__title">{data.name}</h1>
        <p className="attraction-detail__description">{data.description}</p>
        <iframe
          src={data.map}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="attraction-detail__map"
        ></iframe>
        <div className="attraction-detail__images">
          {[data.img1, data.img2, data.img3].map(
            (img, index) =>
              img && (
                <img
                  key={index}
                  src={`/assets/image/doscard/${img}.svg`}
                  alt={`Изображение ${index + 1}`}
                  onClick={() => openModal(img, index)}
                  className="attraction-detail__image"
                />
              )
          )}
        </div>
        <div className="attraction-detail__reviews">
          <h2 className="attraction-detail__reviews-title">Отзывы</h2>
          {user && (
            <form
              onSubmit={handleSubmit}
              className="attraction-detail__review-form"
            >
              <div className="attraction-detail__form-group">
                <label htmlFor="name" className="attraction-detail__label">
                  Имя:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="attraction-detail__input"
                  required
                />
              </div>

              <div className="attraction-detail__form-group">
                <label htmlFor="text" className="attraction-detail__label">
                  Текст отзыва:
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="attraction-detail__textarea"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="attraction-detail__submit-button"
              >
                Оставить отзыв
              </button>
            </form>
          )}

          <div className="attraction-detail__reviews-list">
            {data.reviews?.map((review) => (
              <div key={review.id} className="attraction-detail__review">
                <p className="attraction-detail__review-text">
                  <strong>{review.name}</strong>: {review.text}
                </p>
                {user?.IsAdmin && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="attraction-detail__delete-button"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="attraction-detail__modal-overlay" onClick={closeModal}>
          <div
            className="attraction-detail__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="attraction-detail__modal-button attraction-detail__modal-button--prev"
              onClick={() => navigateImage(-1)}
            >
              ‹
            </button>
            <img
              src={`/assets/image/doscard/${modalImage}.svg`}
              alt="Modal"
              className="attraction-detail__modal-image"
            />
            <button
              className="attraction-detail__modal-button attraction-detail__modal-button--next"
              onClick={() => navigateImage(1)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionDetailPage;
