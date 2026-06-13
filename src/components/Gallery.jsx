import PaintingCard from './PaintingCard';

const Gallery = ({ paintings }) => {
  if (!paintings.length) {
    return (
      <div className="empty-message">
        Ничего не найдено. Попробуйте изменить поиск или сбросить фильтры...
      </div>
    );
  }

  return (
    <div className="gallery">
      {paintings.map(painting => (
        <PaintingCard
          key={painting.id || painting.title}
          image={painting.imageUrl}
          title={painting.title}
          year={painting.year}
          artist={painting.artist}
          location={painting.location}
        />
      ))}
    </div>
  );
};

export default Gallery;