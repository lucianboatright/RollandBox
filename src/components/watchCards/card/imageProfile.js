import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img className="mb-24 mt-9 ml-2 rounded" src={src} alt={caption} width={320} height="auto" />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
