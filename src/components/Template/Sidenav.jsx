import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {
    return (
        <>
            <div className="w-[20%] h-full border-r-[1px] border-zinc-500 p-10">
                <h1 className="text-2xl font-bold text-white">
                    <i className="text-[#6556CD] text-3xl mr-2 ri-movie-2-line"></i>
                    Movie App
                </h1>
                <nav className="text-xl text-zinc-400 flex flex-col gap-3 pb-5">
                    <h1 className="font-semibold mt-8 mb-5 text-white">New Feeds</h1>
                    <Link to='/trending' className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-fire-fill group-hover:text-orange-500 mr-1"></i>
                        Trending
                    </Link>
                    <Link to='/popular' className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-bard-fill group-hover:text-red-600 mr-2"></i>
                        Popular
                    </Link>
                    <Link to='/movie' className="group hover:bg-[#6556CD7A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-vidicon-2-fill group-hover:text-blue-500 mr-2"></i>
                        Movies
                    </Link>
                    <Link to='/tv' className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-tv-2-fill group-hover:text-black mr-2"></i>
                        Tv Shows
                    </Link>
                    <Link to='/person' className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-team-fill group-hover:text-purple-600 mr-2"></i>
                        Celebs
                    </Link>
                </nav>
                <hr className="border-none h-[1px] bg-zinc-400" />
                <nav className="text-xl text-zinc-400 flex flex-col gap-3">
                    <h1 className="font-semibold mt-8 mb-5 text-white">Website Info</h1>
                    <Link className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-information-2-fill group-hover:text-gray-600 mr-2"></i>
                        About Us
                    </Link>
                    <Link className="group hover:bg-[#6556CD5A] hover:text-white duration-300 p-3 hover:p-5 rounded-lg">
                        <i className="ri-phone-fill group-hover:text-green-500 mr-2"></i>
                        Contact Us
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Sidenav;
