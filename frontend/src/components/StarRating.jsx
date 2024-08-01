import Rating from "react-rating-stars-component";
function StarRating({ rating }) {
  return (
    <>
      <div>
        <strong>Rating: {rating?.toFixed(1)}</strong>
        <div style={{ zIndex: -1 }}>
          <Rating
            count={10}
            value={rating?.toFixed(1)}
            size={24}
            activeColor="#ffd700"
            edit={false}
            isHalf={true}
          />
        </div>
      </div>
    </>
  );
}

export default StarRating;
