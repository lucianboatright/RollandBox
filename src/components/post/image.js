import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img className="mb-6 mt-3 ml-0.5 rounded" src={src} alt={caption} width={162.5} height="auto" />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
