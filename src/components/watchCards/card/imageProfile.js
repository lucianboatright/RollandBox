import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img
      className="mb-2 mt-3 ml-0 rounded sm:ml-5 md:ml-5 lg:ml-5 xl:ml-5"
      src={src}
      alt={caption}
      width={330}
      height="auto"
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
