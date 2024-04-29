import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Template/Topnav";
import axios from "../utils/Axios";
import Cards from "./Template/Cards";
import Loading from "./Template/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

function People() {
    document.title = "Movie App | Tv Shows";
    const navigate = useNavigate();
    const [category] = useState("popular");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    const fetchMoreData = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results.length > 0) {
                setPeople((prevData => [...prevData, ...data.results]));
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            console.error(error);
        }

    };


    const refreshHandler = () => {
        if (people.length === 0) {
            fetchMoreData();
        } else {
            setPage(1);
            setPeople([]);
            fetchMoreData();
        }
    }


    useEffect(() => {
        refreshHandler();
    }, [category]);




    return people.length > 0 ? (
        <div className="pt-4 w-screen h-screen">
            <div className="w-full h-[12vh] flex items-center gap-4 justify-between p-8">
                <h1 className="text-2xl text-zinc-300 font-semibold">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
                    ></i>{" "}
                    Celebs
                </h1>
                <div className="flex items-center w-[80%] gap-4 pr-10">
                    <Topnav />
                </div>
            </div>

            <InfiniteScroll
                dataLength={people.length} //This is important field to render the next data
                next={() => fetchMoreData()}
                hasMore={hasMore}
                loader={<h4 className="bg-[#111111] text-zinc-300 text-center">Loading...</h4>}
            >
                <Cards data={people} title='person' />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default People;