const images = require.context(
  "../../assets/images/galleries",
  false,
  /\.(png|jpe?g|svg)$/
);

const galleryImages = images.keys().map((key) => images(key));

export default galleryImages;
