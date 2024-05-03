import PropTypes from 'prop-types';
import { useState } from 'react';
import './StarRating.css';
import Star from './Star';

function StarRating({ maxRating = 5 }) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    function handleSetHoverRating(rating) {
        setHoverRating(rating)
    }
    function handleSetRating(rating) {
        setRating(rating)
    }
    return (
        <div className="container">
            <div className='stars'>
                {Array.from({ length: maxRating }, (_, i) => <Star 
                    key={i}
                    onRate={() => handleSetRating(i+1)}
                    onHover={() => handleSetHoverRating(i+1)}
                    onHoverLeave={() => handleSetHoverRating(0)}
                    full={hoverRating ? hoverRating >= i+1 : rating >= i+1} />)}
            </div>
            <p>{rating || 'No rating yet'}</p>
        </div>
    )
}

StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
}

// function Star() {
//     return (
//         <>
//             <span role="img" aria-label="star">⭐️ </span>
//         </>
//     )
// }

export default StarRating;


