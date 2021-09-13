import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img
      className="mb-2 mt-9 ml-0 rounded sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2"
      src={src}
      alt={caption}
      width={320}
      height="auto"
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
