import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img
      className=" mt-6 ml-2.5 align-center rounded"
      src={src}
      alt={caption}
      width={195}
      height="auto"
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
