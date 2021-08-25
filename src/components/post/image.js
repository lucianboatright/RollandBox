import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img
      className="mb-6 mt-5 ml-0.5 border rounded"
      src={src}
      alt={caption}
      width={150}
      height={200}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
