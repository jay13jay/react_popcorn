import PropTypes from 'prop-types';
import { useState } from 'react';
import Star from './Star';

function StarRating({ 
    maxRating = 5,
    color = '#fcc419',
    size = 48 
}) {

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    function handleSetHoverRating(rating) {
        setHoverRating(rating)
    }
    function handleSetRating(rating) {
        setRating(rating)
    }

    const textStyle = {
        color,
        fontSize: `${size / 2.5}px`,
        lineHeight: '2',
        margin: '0',
    }
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    }
    const starsStyle = {
        display: 'flex',
    }

    return (
        <div style={containerStyle} >
            <div style={starsStyle} >
                {Array.from({ length: maxRating }, (_, i) => <Star 
                    key={i}
                    onRate={() => handleSetRating(i+1)}
                    onHover={() => handleSetHoverRating(i+1)}
                    onHoverLeave={() => handleSetHoverRating(0)}
                    full={hoverRating ? hoverRating >= i+1 : rating >= i+1} 
                    color={color}
                    size={size} />)}
            </div>
            <p style={textStyle}>{rating || ''}</p>
        </div>
    )
}

StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
}

// function Star() {
//     return (
//         <>
//             <span role="img" aria-label="star">⭐️ </span>
//         </>
//     )
// }

export default StarRating;


