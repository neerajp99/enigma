import logo from "../../icon.png"
export default () => {
    return (
        <header className="text-gray-400 bg-black body-font relative">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <span className="ml-3 text-xl"><img src={logo} className="h-16 w-28" /></span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
    </nav>
    <button className="inline-flex items-center navbar border-0 py-4 px-8 text-white focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Logout
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
    )
}