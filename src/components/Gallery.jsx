import PaintingCard from './PaintingCard';

const Gallery = ({ paintings }) => {
  return (
    <div className="gallery">
      {paintings.map(painting => (
        <PaintingCard
          key={painting.id || painting.title}
          image={painting.imageUrl}
          title={painting.title}
          year={painting.year}
          hoverTitle={painting.artist}
          hoverYear={painting.location}
        />
      ))}
    </div>
  );
};

export default Gallery;