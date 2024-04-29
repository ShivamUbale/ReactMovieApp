import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import no_image from "/no-image.png";

function Topnav() {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState(null);

    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GetSearches();
    }, [query]);

    return (
        <div className="group relative w-1/2 h-[8vh] mx-auto flex items-center justify-center">
            {query.length === 0 && (
                <i className="text-xl text-zinc-300  group-hover:text-blue-500 ri-search-2-line"></i>
            )}
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="w-[95%] h-full pl-4 bg-transparent text-zinc-200 text-lg border-none outline-none "
                type="text"
                placeholder="Search any movies/series"
            />
            {query.length > 0 && (
                <i
                    onClick={() => setQuery("")}
                    className="cursor-pointer text-xl text-zinc-300 group-hover:text-red-500 ri-close-large-line"
                ></i>
            )}

            <div className="absolute top-[100%] w-full max-h-[50vh] rounded-xl bg-zinc-00 flex flex-col gap-2 overflow-auto z-10">
                {searches && searches.map((s, i) => (
                    <Link to={`/${s.media_type}/details/${s.id}`}
                        key={i}
                        className="w-full px-8 py-2 bg-zinc-300 text-zinc-800 flex justify-between items-center rounded-xl "
                    >
                        <div>
                            <h1 className="text-xl font-semibold text-zinc-700">
                                {s.name || s.title || s.original_name || s.original_title}
                            </h1>
                            <h4 className="text-sm font-semibold text-zinc-700">{s.first_air_date || s.release_date}</h4>
                        </div>

                        <img
                            className="w-38 h-24 rounded-lg shadow-xl"
                            src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : no_image}
                            alt=""
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Topnav;
