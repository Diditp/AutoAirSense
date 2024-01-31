export default function RoomStatusCard({ status, isActive, imgSrc, desc, style }) {
  return (
    <>
      <div className="bg-white box-shadow w-11/12 md:room-card min-width my-5 mr-5">
        <div className="p-5">
          <h3 className="mb-1">
            Status :{" "}
            <span className={style}>
              {isActive}
            </span>
          </h3>
          <h2 className="font-semibold">{status}</h2>
        </div>
        <img
          src={imgSrc}
          alt="Kualitas Udara Baik"
          className="bg-cover w-full"
        />
        <div className="p-3 min-h-fit sm:p-5 bg-slate-200 md:bg-white flex justify-end">
          <p className="text-justify md:text-center text-sm md:text-base">
            {desc}
          </p>
        </div>
      </div>
    </>
  );
}
