
export default function RoomStatusCard({ status, imgSrc, desc }) {
  return (
    <>
      <div className="bg-white box-shadow w-11/12 md:room-card min-width my-5 mr-5">
        <div className="p-5">
          <h2 className="font-semibold "><span className="font-normal text-black">Kualitas udara :</span> {status}</h2>
        </div>
        <img
          src={imgSrc}
          alt="Kualitas Udara Baik"
          className="bg-cover w-full"
        />
        <div className="p-3 min-h-fit sm:p-5 room-content md:room-content flex justify-end">
          <p className="text-justify md:text-center text-sm md:text-base">
            {desc}
          </p>
        </div>
      </div >
    </>
  );
}
