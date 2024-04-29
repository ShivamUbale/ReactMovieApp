import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadperson, removeperson } from "../store/actions/personActions";
import Loading from "../components/Template/Loading";
import no_image from "/no-image.png";
import Dropdown from "./Template/Dropdown";


function PersonDetails() {
    // const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { value } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setCategory] = useState('movie');


    useEffect(() => {
        dispatch(asyncLoadperson(id));

        return () => {
            dispatch(removeperson());
        };
    }, [id]);


    return value ? (
        <div className="w-screen min-h-screen px-[10%] text-white pb-[4%]">
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full flex gap-10 items-center text-xl text-zinc-300">
                <Link
                    onClick={() => navigate(-1)}
                    className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
                ></Link>
            </nav>

            {/* Part 2 poster and details */}
            <div className="w-full flex">
                {/* Part 2 left poster and details */}
                <div className="w-[25%]">
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

                    {/* Social Media Links */}
                    <div className="py-4 w-full flex gap-4 items-center text-2xl text-zinc-300">
                        {value.external_id.facebook_id &&
                            <a target="_blank" href={`https://www.facebook.com/${value.external_id.facebook_id}`}>
                                <i className="ri-facebook-circle-fill cursor-pointer"></i>
                            </a>
                        }
                        {value.external_id.twitter_id &&
                            <a
                                target="_blank"
                                href={`https://twitter.com/${value.external_id.twitter_id}`}
                            >
                                <i className="ri-twitter-x-fill"></i>
                            </a>
                        }
                        {value.external_id.instagram_id &&
                            <a
                                target="_blank"
                                href={`https://www.instagram.com/${value.external_id.instagram_id}/`}
                                className="font-semibold"
                            >
                                <i className="ri-instagram-line"></i>
                            </a>
                        }
                        {value.external_id.tiktok_id &&
                            <a
                                target="_blank"
                                href={`https://tiktok.com/${value.external_id.tiktok_id}`}
                                className="font-semibold"
                            >
                                <i className="ri-tiktok-fill"></i>
                            </a>
                        }
                        {value.external_id.imdb_id &&
                            <a
                                target="_blank"
                                href={`https://www.imdb.com/name/${value.external_id.imdb_id}/`}
                                className="font-semibold"
                            >
                                IMDb
                            </a>
                        }

                    </div>


                    {/* Personal Informations */}
                    <div className="py-2 w-full flex flex-col items-start ">
                        <h1 className="text-2xl text-zinc-400 font-semibold mb-2">Personal Info</h1>
                        <h3 className="font-semibold text-zinc-300 ">Known For</h3>
                        <p className="font-light">{value.detail.known_for_department}</p>

                        <h3 className="font-semibold text-zinc-300 mt-4">Gender</h3>
                        <p className="font-light">{value.detail.gender === 1 ? 'Female' : 'Male'}</p>

                        <h3 className="font-semibold text-zinc-300 mt-4">Birthday</h3>
                        <p className="font-light">{value.detail.birthday ? value.detail.birthday : 'No Info'}</p>

                        <h3 className="font-semibold text-zinc-300 mt-4">Deathday</h3>
                        <p className="font-light">{value.detail.deathday ? value.detail.deathday : 'Still Alive'}</p>

                        <h3 className="font-semibold text-zinc-300 mt-4">Place of Birth</h3>
                        <p className="font-light">{value.detail.place_of_birth ? value.detail.place_of_birth : 'No Info'}</p>

                        <h3 className="font-semibold text-zinc-300 mt-4">Also Known As</h3>
                        <p className="font-light">{value.detail.also_known_as.length > 0 ? value.detail.also_known_as.join(', ') : 'No Info'}</p>
                    </div>
                </div>

                {/* Part 2 right poster and details */}
                <div className="content w-[75%] ml-[4%]">
                    <h1 className="text-6xl font-semibold text-zinc-400">
                        {value.detail.name ||
                            value.detail.title ||
                            value.detail.original_name ||
                            value.detail.original_title}
                    </h1>

                    <div>
                        <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Biography</h1>
                        <p className="text-zinc-300">{value.detail.biography.slice(0, 1000)}</p>
                        {/* <hr className="mt-10 mb-5 border-none h-[2px] rounded-full bg-zinc-400" /> */}
                        <h1 className="text-2xl text-zinc-400 font-semibold mb-2 mt-3">Known For </h1>
                        {/* <HorizontalCards data={value.detail.seasons} /> */}
                        <div className="w-full flex gap-3 overflow-x-auto overflow-y-hidden">
                            {value.combined_credit.cast.length > 0 ? (
                                value.combined_credit.cast.map((s, i) => (
                                    <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="min-w-[20%] max-w-[20%] h-[45vh] overflow-y-auto">
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
                                            {s.name || s.title || s.original_name || s.original_title}
                                        </h1>
                                    </Link>
                                ))
                            ) : (
                                <div className="w-full h-[30vh] flex items-center justify-center">
                                    <h1 className="text-3xl font-semibold text-zinc-300 ">
                                        Nothing to show
                                    </h1>
                                </div>
                            )}
                        </div>

                        <div className="w-full h-[12vh] flex items-center gap-4 justify-between p-8">
                            <h1 className="text-2xl text-zinc-300 font-semibold">
                                Acting <small className="text-sm text-zinc-600">({category})</small>
                            </h1>
                            <div className="flex items-center gap-4">
                                <Dropdown
                                    title="Category"
                                    options={["tv", "movie"]}
                                    func={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full h-[50vh] overflow-y-auto overflow-x-hidden shadow-xl shadow-[rgba(255,255,255,.1)] border-2 border-zinc-800 p-4 flex flex-col gap-4">
                            {value[category + 'Credits'] && value[category + 'Credits'].cast.map((c, i) => (
                                <li key={i} className="hover:bg-[#19191d] p-4 cursor-pointer">
                                    <Link to={`/${category}/details/${c.id}`} >
                                        <span className="font-semibold text-zinc-300 mt-4">{c.name || c.title || c.original_name || c.original_title}</span>
                                        {c.character && <span className="block font-light pl-6">as {c.character}</span>}
                                    </Link>
                                </li>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default PersonDetails;