import React from "react";
import { Link } from "react-router-dom";
import no_image from "/no-image.png";

function Cards({ data, title }) {



    return (
        <div className="w-full h-full flex flex-wrap pl-10 justify-center bg-[#111111]">
            {data.map((c, i) => (
                <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className="w-[25vh] mr-[3%] mb-[3%] rounded relative">
                    <img
                        className=" h-[40vh] object-cover rounded"
                        src={
                            c.poster_path || c.backdrop_path || c.profile_path
                                ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path
                                }`
                                : no_image
                        }
                        alt=""
                    />

                    <h1 className="text-xl font-semibold text-zinc-300 p-2 ">
                        {c.name || c.title || c.original_name || c.original_title}
                    </h1>

                    {c.vote_average &&
                        <div className="text-zinc-300 font-semibold bg-amber-600 w-10 h-10 absolute bottom-[30%] right-[-10%] flex justify-center items-center rounded-full">{(c.vote_average * 10).toFixed()}<sup>%</sup></div>
                    }
                </Link>
            ))}
        </div>
    );
}

export default Cards;
