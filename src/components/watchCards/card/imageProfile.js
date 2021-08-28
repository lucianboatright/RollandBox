import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <img className="mb-10 mt-6 ml-2.5 rounded" src={src} alt={caption} width={250} height={300} />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
