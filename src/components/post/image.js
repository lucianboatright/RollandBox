import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <div>
      <img
        className=" mt-5 ml-3 align-center rounded"
        src={src}
        alt={caption}
        width={195}
        height="auto"
      />
      <div
        style={{ height: '300px', width: '195px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.9)' }}
      />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
