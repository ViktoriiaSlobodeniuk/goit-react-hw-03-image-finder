import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imageCardsArray }) => {
  console.log(imageCardsArray);
  return (
    <ul className={css.ImageGallery}>
      {imageCardsArray.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} image={webformatURL} tags={tags} />
      ))}
    </ul>
  );
};
