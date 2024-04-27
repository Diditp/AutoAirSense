import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="sidebar sidebar-color min-h-screen text-white ">
      <header className="flex p-4 header-height justify-center items-center bg-blue-400">
        <Link to="/">
          <h1 className="head-1 text-lg font-semibold lg:text-1xl">AUTOAIRSENSE</h1>
          <h1 className="head-2 text-lg font-semibold sm:text-2xl">AAR</h1>
        </Link>
      </header>
      <ul className="items pl-10">
        <li className="my-7">
          <Link
            to="/"
            className="sidebar-item flex flex-wrap items-center hover:text-gray-300"
          >
            <FontAwesomeIcon size="lg" icon="home" className="mr-5" />
            <p>Dashboard</p>
          </Link>
        </li>
        <li className="my-7">
          <Link
            to="/Chart"
            className="sidebar-item flex flex-wrap items-center hover:text-gray-300"
          >
            <FontAwesomeIcon size="lg" icon="chart-simple" className="mr-6" />
            <p>Chart</p>
          </Link>
        </li>
        <li className="my-7">
          <Link
            to="/About"
            className="sidebar-item flex flex-wrap items-center hover:text-gray-300"
          >
            <FontAwesomeIcon size="lg" icon="clock" className="mr-5" />
            <p>About</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
