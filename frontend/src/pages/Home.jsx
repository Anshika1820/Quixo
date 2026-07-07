import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from '../components//SearchBar'
function Home(){
  const [query,setQuery]=useState("")
  const navigate=useNavigate();
  function handleSearch(){
    navigate(`search?q=${query}`)
  }
  return(
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-purple-500 flex flex-col justify-center items-center">
      
      <h1 className="text-purple-950 tracking-tight text-7xl drop-shadow-lg font-sans font-bold mb-12 ">Search Engine</h1>
      <p className="text-gray-600 text-lg mb-10">Search smarter. Find faster.</p>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch}/>
    </div>
  )
}
export default Home
  