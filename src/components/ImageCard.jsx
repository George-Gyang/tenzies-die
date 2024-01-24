/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const ImageCard = ({image}) => {
  return (
    <div className="col-lg-3 mb-4 pb-5 col-md-4 col-6">
      <Link to={image.urls.small} target="_blank">
        <img
          src={image.urls.small}
          alt={image.alt_description} className="img-fluid rounded img_height w-100" /></Link>
          <p className='fw-semibold fs_xsm'>{image.alt_description}</p>
    </div>
  )
}

export default ImageCard