import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img
      className="mb-6 mt-5 ml-0.5 rounded hjklh"
      src={src}
      alt={caption}
      width={161}
      height="auto"
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
