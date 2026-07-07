function SearchBar({ query, setQuery, handleSearch }) {

  return (
    <div className="flex flex-col items-center">

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==="Enter") handleSearch()
        }}
        placeholder="Search anything here..."
        className="w-[900px] h-16 px-8 rounded-full text-black bg-purple-100 shadow-lg focus:shadow-xl outline-none text-lg text-gray-600 mb-10 border-2 transparent border-purple-200 focus:border-purple-400 transition-all duration-300" 
      />
      <button className="font-semibold bg-purple-950 px-8 py-2 rounded-full text-white hover:bg-purple-900 hover:scale-103 transition" onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar