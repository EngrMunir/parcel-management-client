
const TopCard = ({item}) => {
    const { deliveryManName,image, parcelsDelivered, averageRatings } = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{deliveryManName}</h2>
    <p>Parcel Delivered: {parcelsDelivered}</p>
    <p>Ratings: {averageRatings}</p>
  </div>
</div>
    );
};

export default TopCard;