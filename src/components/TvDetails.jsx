import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { asyncLoadtv, removetv } from "../store/actions/tvActions";
import Loading from "../components/Template/Loading";
import no_image from "/no-image.png";
import HorizontalCards from "./Template/HorizontalCards";

function TvDetails() {
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { value } = useSelector((state) => state.tv);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(asyncLoadtv(id));

        return () => {
            dispatch(removetv());
        };
    }, [id]);

    return value ? (
        <div
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${value.detail.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-screen min-h-screen px-[10%] text-white"
        >
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full flex gap-10 items-center text-xl text-zinc-300">
                <Link
                    onClick={() => navigate(-1)}
                    className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
                ></Link>
                <a target="_blank" href={value.detail.homepage}>
                    <i className="ri-external-link-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${value.external_id.wikidata_id}`}
                >
                    <i className="ri-earth-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${value.external_id.imdb_id}/`}
                    className="font-semibold"
                >
                    IMDb
                </a>
            </nav>

            {/* Part 2 poster and details */}
            <div className="w-full flex">
                <img
                    className=" h-[60vh] object-cover rounded"
                    src={
                        value.detail.poster_path ||
                            value.detail.backdrop_path ||
                            value.detail.profile_path
                            ? `https://image.tmdb.org/t/p/original/${value.detail.poster_path ||
                            value.detail.backdrop_path ||
                            value.detail.profile_path
                            }`
                            : no_image
                    }
                    alt=""
                />
                <div className="content ml-[4%]">
                    <h1 className="text-6xl font-semibold">
                        {value.detail.name ||
                            value.detail.title ||
                            value.detail.original_name ||
                            value.detail.original_title}
                        <small className="ml-3 text-xl font-bold text-zinc-300">
                            ({value.detail.first_air_date.split("-")[0]})
                        </small>
                    </h1>

                    <div className="flex gap-x-4 mt-2">
                        <h1 className="flex items-center gap-2 text-zinc-300">
                            <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
                            {value.detail.first_air_date}
                        </h1>
                        <h1 className="flex items-center gap-2 text-zinc-300">
                            <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
                            {value.detail.genres.map((g) => g.name).join(", ")}
                        </h1>
                    </div>

                    <div className=" mt-2 flex gap-1 items-center">
                        {value.detail.vote_average && (
                            <div className="text-zinc-300 font-semibold bg-amber-600 w-12 h-12 flex justify-center items-center rounded-full">
                                {(value.detail.vote_average * 10).toFixed()}
                                <sup>%</sup>
                            </div>
                        )}
                        <h1 className="text-lg font-semibold w-14 leading-5">User Score</h1>
                    </div>

                    <h1 className="italic text-lg font-semibold text-zinc-300 mt-3">
                        {value.detail.tagline}
                    </h1>

                    <div>
                        <h1 className="text-xl font-semibold mt-3">Overview</h1>
                        <p>{value.detail.overview}</p>
                    </div>

                    <div className="my-3">
                        <h1 className="text-xl font-semibold">Series Translated</h1>
                        <p>{value.translations.join(", ")}</p>
                    </div>

                    <Link
                        to={`${pathname}/trailer`}
                        className="px-2 py-2.5 bg-[#6556CD] rounded-lg"
                    >
                        <i className="ri-play-fill text-lg"></i> Play Trailer
                    </Link>
                </div>
            </div>

            {/* Part 3 available on platforms */}
            <div className="w-[80%] mt-10 flex flex-col gap-y-5">
                {value.watchproviders && value.watchproviders.flatrate && (
                    <div className="flex items-center gap-x-5">
                        <h1 className="w-[18%]">Available on Platforms: </h1>
                        {value.watchproviders.flatrate.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className=" h-[5vh] w-[5vh] object-cover rounded"
                                src={
                                    w.logo_path
                                        ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                                        : no_image
                                }
                                alt=""
                            />
                        ))}
                    </div>
                )}

                {value.watchproviders && value.watchproviders.rent && (
                    <div className="flex items-center gap-x-5">
                        <h1 className="w-[18%]">Available to Rent: </h1>
                        {value.watchproviders.rent.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className=" h-[5vh] w-[5vh] object-cover rounded"
                                src={
                                    w.logo_path
                                        ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                                        : no_image
                                }
                                alt=""
                            />
                        ))}
                    </div>
                )}

                {value.watchproviders && value.watchproviders.buy && (
                    <div className="flex items-center gap-x-5">
                        <h1 className="w-[18%] font-semibold">Available to Buy: </h1>
                        {value.watchproviders.buy.map((w, i) => (
                            <img
                                key={i}
                                title={w.provider_name}
                                className=" h-[5vh] w-[5vh] object-cover rounded"
                                src={
                                    w.logo_path
                                        ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                                        : no_image
                                }
                                alt=""
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Part 4 recommendations and similar */}
            <hr className="mt-10 mb-5 border-none h-[2px] rounded-full bg-zinc-400" />
            <h1 className="text-3xl font-semibold mb-3">Seasons: </h1>
            {/* <HorizontalCards data={value.detail.seasons} /> */}
            <div className="w-full flex gap-3 overflow-x-auto overflow-y-hidden p-4">
                {value.detail.seasons.length > 0 ? (
                    value.detail.seasons.map((s, i) => (
                        <div key={i} className="min-w-[16%] max-w-[16%]">
                            <img
                                className="h-[35vh] object-cover object-[center_10%] rounded-lg shadow-xl"
                                src={
                                    s.poster_path || s.backdrop_path
                                        ? `https://image.tmdb.org/t/p/original/${s.poster_path || s.backdrop_path
                                        }`
                                        : no_image
                                }
                                alt=""
                            />

                            <h1 className="text-xl font-semibold text-zinc-300 p-2">
                                {s.name}
                            </h1>
                            <h4 className="text-sm font-bold text-zinc-300 flex items-center px-2">
                                {s.air_date && s.air_date.split("-")[0]}
                                <div className="w-1 h-1 rounded-full bg-zinc-300 mx-2"></div>
                                {s.episode_count && s.episode_count} Episodes
                            </h4>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[30vh] flex items-center justify-center">
                        <h1 className="text-3xl font-semibold text-zinc-300 ">
                            Nothing to show
                        </h1>
                    </div>
                )}
            </div>

            {/* Part 5 recommendations and similar */}
            <hr className="mt-5 mb-5 border-none h-[2px] rounded-full bg-zinc-400" />
            <h1 className="text-3xl font-semibold mb-3">
                Recommendations & Similar:{" "}
            </h1>
            <HorizontalCards
                data={
                    value.recommendations.length > 0
                        ? value.recommendations
                        : value.similar
                }
            />

            <Outlet />
        </div>
    ) : (
        <Loading />
    );
}

export default TvDetails;
