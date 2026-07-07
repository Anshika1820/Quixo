import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function SearchResults(){
    const [results, setResults]=useState([])
    const [searchParams]=useSearchParams()
    const query=searchParams.get("q").toLowerCase()
    async function fetchResults(){
        const response=await axios.get(
            `http://localhost:8080/search?query=${query}`
        )
        setResults(response.data)
    }
    useEffect(() =>{
        fetchResults()
    },[])

    return(
        <div className="min-h-screen bg-purple-100 text-white p-10">
            <h1 className="text-4xl font-bold mb-10">Results for: <span className="text-blue-500 ml-3">{query}</span></h1>
            <div className="space-y-8">
                {
                    results.map((item, index) =>(
                        <div key={index} className="bg-purple-950 p-8 text-center  rounded-2xl hover:bg-purple-800 transition w-65">
                            <a href={item.url} target="_blank" className="text-3xl font-bold text-blue-400 ">{item.title}</a>
                            <p className="text-gray-400 mt-3">{item.description}</p>
                            <p className="text-green-400 mt-2">{item.url}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default SearchResults