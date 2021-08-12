import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return <img className="ml-3 mb-2" src={src} alt={caption} width={120} height={170} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
