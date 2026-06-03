import PaintingCard from './PaintingCard';

const Gallery = ({ paintings }) => {
  console.log('Gallery получила paintings:', paintings);
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