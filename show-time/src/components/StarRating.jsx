import Rating from "react-rating-stars-component";
function StarRating({ rating }) {
  return (
    <>
      <div>
        <strong>Rating: {rating?.toFixed(1)}</strong>

        <Rating
          count={10}
          value={rating?.toFixed(1)}
          size={24}
          activeColor="#ffd700"
          edit={false}
          isHalf={true}
        />
      </div>
    </>
  );
}

export default StarRating;
