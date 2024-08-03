
const AllDeliveryMen = () => {
    return (
        <div>
            <h2 className='text-center'>Delivery Men</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Delivery Men Name</th>
        <th>Phone Number</th>
        <th>Number of Parcel Delivered</th>
        <th>Average Review</th>
      </tr>
    </thead>
    <tbody>
      {/* {
        myParcels.map(parcel =><tr className="bg-base-200" key={parcel._id}>
            <td>{parcel.parcelType}</td>
            <td>{parcel.requestedDeliveryDate}</td>
            <td>Quality Control</td>
            <td>{parcel.bookingDate}</td>
            <th>1</th>
            <td>{parcel.status}</td>
            <td><Link to={`/dashboard/update/${parcel._id}`}><FaEdit className="text-3xl text-blue-500" /></Link></td>
            <td><button onClick={()=>handleCancel(parcel._id)}><MdOutlineCancelPresentation className="text-3xl text-red-500"/> </button></td>
            <td><MdOutlineRateReview className="text-3xl text-blue-500"/> </td>
            <td><Link to={`/payment/${parcel._id}`} state={{parcel}} ><MdOutlinePayments className="text-3xl text-blue-500"/></Link></td>  
          </tr>)
    } */}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllDeliveryMen;