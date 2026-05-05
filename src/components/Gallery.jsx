import PaintingCard from './PaintingCard';
import { paintings } from '../data/paintings';

const Gallery = () => {
  return (
    <div className="gallery">
      {paintings.map(painting => (
        <PaintingCard
          key={painting.id}
          image={painting.image}
          title={painting.title}
          year={painting.year}
          hoverTitle={painting.hoverTitle}
          hoverYear={painting.hoverYear}
        />
      ))}
    </div>
  );
};

export default Gallery;