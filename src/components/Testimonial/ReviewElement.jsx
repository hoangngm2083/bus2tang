import ava03 from "../../assets/images/ava-3.jpg";
const ReviewElement = ({ review }) => {
  const { reviewer, content = "Leave no review!" } = review;
  const reviewerName = reviewer["name"] || "Anonymous";
  const reviewerType = reviewer["type"] || "Customer";
  const reviewerImage = reviewer["img"] || ava03;
  return (
    <div className="testimonial py-4 px-3">
      <div className="d-flex align-items-center gap-4 mt-3">
        <img
          src={reviewerImage}
          style={{
            width: "50px",
            height: "50px",
          }}
          className=" rounded-2"
          alt=""
        />
        <div>
          <h6 className="mb-0 mt-3">{reviewerName}</h6>
          <p>{reviewerType}</p>
        </div>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
};
export default ReviewElement;
