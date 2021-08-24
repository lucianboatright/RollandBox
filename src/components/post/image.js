import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img className="mb-14 mt-2 border rounded" src={src} alt={caption} width={150} height={200} />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
