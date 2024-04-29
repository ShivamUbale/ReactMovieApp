import React from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import NotFound from './NotFound';

function Trailer() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes('movie') ? 'movie' : 'tv';
    const ytvideo = useSelector((state) => state[category].value.videos);



    return (
        <div className='w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.9)] flex items-center justify-center'>
            <Link
                onClick={() => navigate(-1)}
                className="ri-close-fill text-2xl hover:text-[#6556CD] cursor-pointer absolute top-[5%] right-[8%]"
            ></Link>
            {ytvideo ? (
                <ReactPlayer
                    controls
                    height={600}
                    width={1200}
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />) : (<NotFound />)}
        </div>
    )
}

export default Trailer;