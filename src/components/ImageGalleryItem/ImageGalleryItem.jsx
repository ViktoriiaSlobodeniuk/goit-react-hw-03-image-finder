import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItem_image} src={image} alt={tags} />
    </li>
  );
};
