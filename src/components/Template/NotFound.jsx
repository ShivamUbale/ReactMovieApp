import Error404 from '/Error404.gif';

function NotFound() {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black'>
            <img className='w-[50%] h-full' src={Error404} alt="" />
        </div>
    );
}

export default NotFound;