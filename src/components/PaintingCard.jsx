const PaintingCard = ({ image, title, year, hoverTitle, hoverYear }) => {
  return (
    <div className="painting-card">
      <div className="painting-image-wrapper">
        <img src={image} alt={title} className="painting-image" />
        <div className="painting-overlay">
          <div className="overlay-content">
            <div className="overlay-text">
              <div className="original-text">
                <h2 className="overlay-title">{title}</h2>
                <p className="overlay-year">{year}</p>
              </div>
              <div className="hover-text">
                <h2 className="overlay-title-hover">{hoverTitle}</h2>
                <p className="overlay-year-hover">{hoverYear}</p>
              </div>
            </div>
            <div className="overlay-arrow">
              <img src="/assets/icons/Arrow right_lightgray.svg" alt="Подробнее" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;