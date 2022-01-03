import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
  return (
    <div
      className=" mt-5 ml-3 align-center rounded"
      style={{
        height: '315px',
        width: '195px',
        background: `url(${src})`,
        boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.9)',
        backgroundSize: '195px 320px'
      }}
    >
      {/* <img
        className=" mt-5 ml-3 align-center rounded"
        src={src}
        alt={caption}
        // width={195}
        // height="auto"
        // style={{
        //   height: '300px',
        //   width: '195px',
        //   position: 'relative',
        //   zIndex: -2
        //   // backgroundImage: url(src)
        // }}
      /> */}
      {/* <div
        style={{ height: '300px', width: '195px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.9)' }}
      /> */}
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};
