import React, { useEffect, useState } from 'react';
import Sidenav from './Template/Sidenav';
import Topnav from './Template/Topnav';
import Header from './Template/Header';
import axios from '../utils/Axios';
import HorizontalCards from './Template/HorizontalCards';
import Dropdown from './Template/Dropdown';
import Loading from './Template/Loading';

function Home() {
    document.title = 'Movie App | Home Page';
    const [wallpaper, setWallpaper] = useState(null);
    const [trend, setTrend] = useState(null);
    const [category, setCategory] = useState('all');

    const GetWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let randomData = data.results[Math.floor(Math.random() * data.results.length)];
            setWallpaper(randomData);

        } catch (error) {
            console.error(error);
        }
    }

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            setTrend(data.results);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        GetTrending();
        !wallpaper && GetWallpaper();
    }, [category]);


    return wallpaper && trend ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full'>
                <Topnav />
                <Header data={wallpaper} />

                <div className='flex justify-between p-5 pb-0'>
                    <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>
                    <Dropdown title='Filter' options={['tv', 'movie', 'all']} func={(e) => setCategory(e.target.value)} />
                </div>

                <HorizontalCards data={trend} />
            </div>
        </>
    ) : <Loading/>
}

export default Home;