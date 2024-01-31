export default function ({ imgSrc, name, description, imgAlt }) {
  return (
    <>
      <div className="bg-white box-shadow w-11/12 md:room-card min-width my-5 mr-5">
        <img className="bg-cover w-full h-64 md:h-1/2" src={imgSrc} alt={imgAlt} />
        <div className="flex justify-between w w-full p-2 bg-blue-300">
          <h4>{name}</h4>
          <button>Turn On</button>
        </div>
        <div className="p-3 min-h-fit sm:p-5 bg-slate-200 md:bg-white flex justify-end">
          <p className="text-justify md:text-center text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
