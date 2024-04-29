import no_image from "/no-image.png";
import { Link } from 'react-router-dom';



function HorizontalCards({ data }) {
    
    return data.length > 0 ? (

        <div className='w-[100%] h-[45vh] flex gap-3 overflow-x-auto overflow-y-hidden p-4 mb-4'>
            {data.map((d, i) => (
                <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[16%] h-[40vh] bg-zinc-900 rounded-lg overflow-hidden'>
                    <img className="w-full h-[60%] object-cover object-[center_10%] rounded-lg shadow-xl"
                        src={d.poster_path || d.backdrop_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path}` : no_image}
                        alt="" />
                    <div className='w-full h-[40%] text-zinc-300 p-2 overflow-y-auto'>
                        <h1 className="text-lg font-semibold ">
                            {d.name || d.title || d.original_name || d.original_title}
                        </h1>
                        <p className="text-sm">{d.overview.slice(0, 50)}<span className="text-blue-400">...more</span></p>
                    </div>
                </Link>
            ))}
        </div>


    ) : <div className='w-full h-[30vh] flex items-center justify-center'>
        <h1 className='text-3xl font-semibold text-zinc-300 '>Nothing to show </h1>
    </div>
}

export default HorizontalCards;