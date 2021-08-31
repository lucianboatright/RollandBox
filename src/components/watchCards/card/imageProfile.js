import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img className="mb-8 mt-5 ml-2 rounded" src={src} alt={caption} width={260} height="auto" />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
