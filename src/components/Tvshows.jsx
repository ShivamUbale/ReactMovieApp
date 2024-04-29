import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Template/Topnav";
import Dropdown from "./Template/Dropdown";
import axios from "../utils/Axios";
import Cards from "./Template/Cards";
import Loading from "./Template/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

function Tvshows() {
    document.title = "Movie App | Tv Shows";
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, setTV] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const fetchMoreData = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                setTV((prevData => [...prevData, ...data.results]));
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            console.error(error);
        }

    };


    const refreshHandler = () => {
        if (tv.length === 0) {
            fetchMoreData();
        } else {
            setPage(1);
            setTV([]);
            fetchMoreData();
        }
    }


    useEffect(() => {
        refreshHandler();
    }, [category]);




    return tv.length > 0 ? (
        <div className="pt-4 w-screen h-screen">
            <div className="w-full h-[12vh] flex items-center gap-4 justify-between p-8">
                <h1 className="text-2xl text-zinc-300 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
                    ></i>{" "}
                    Tv Shows <small className="text-sm text-zinc-600">({category})</small>
                </h1>
                <div className="flex items-center w-[80%] gap-4 pr-10">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["on_the_air", "popular", "top_rated", "airing_today"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={tv.length} //This is important field to render the next data
                next={() => fetchMoreData()}
                hasMore={hasMore}
                loader={<h4 className="bg-[#111111] text-zinc-300 text-center">Loading...</h4>}
            >
                <Cards data={tv} title='tv'/>
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Tvshows;