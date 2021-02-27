import {Link} from 'react-router-dom'
export default () => {
    return (
        <div className="w-screen h-screen bg-black container flex flex-col items-center justify-center">
            <div className="flex flex-wrap h-full justify-center items-center">
            <ul>
                <h2 className="text-4xl font-serif text-white text-bolder"> 404 Not Found </h2>
                <br />
                <Link 
                to="/"
                >
                <button className="inline-flex mt-6 items-center navbar border-0 py-4 px-8 text-white focus:outline-none hover:bg-white rounded text-base">Home
      <svg fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    </Link>
    </ul>

            </div>
            
        </div>
    )
}