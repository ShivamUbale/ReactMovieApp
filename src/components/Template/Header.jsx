import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
    
    return (
        <div
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path
                    })`,
                backgroundPosition: "0 10%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full h-[48vh] p-[2%] flex flex-col justify-end items-start gap-2"
        >
            <h1 className="text-6xl font-semibold text-zinc-300">
                {data.name || data.title || data.original_name || data.original_title}
            </h1>
            <p className="text-zinc-300 w-3/5">
                {data.overview.slice(0, 200)}
                <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">...more</Link>
            </p>
            <p className="text-zinc-300">
                <i className="ri-megaphone-fill text-yellow-600"></i>
                {data.release_date || data.first_air_date || "No Information"}
                <i className="ri-album-fill text-yellow-600 ml-3"></i>
                {data.media_type.toUpperCase()}
            </p>
            <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="text-zinc-300 p-2 bg-[#6556CD] hover:bg-[#6556CD9A] rounded">
                Watch Trailer
            </Link>
        </div>
    );
}

export default Header;
