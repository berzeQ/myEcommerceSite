import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

function SearchBar() {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();

  const generateProductList = async (value) => {
    try {
      if (value.length > 0) {
        const res = await fetch(
          `http://localhost:3006/products-search/${value}`
        );
        const data = await res.json();
        console.log();
        if (data.productList) {
          setSearchResult(data.productList);
          setShowSearchResult(true);
        }
      } else {
        setShowSearchResult(false);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <div className="searchContainer">
      <form>
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-5 px-48 pl-10 text-md text-neutral-300 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Clothes ... "
            required
            onChange={(e) => generateProductList(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {showSearchResult && searchResult && (
        <div className="bg-slate-300 h-32 absolute z-10 w-full mt-5">
          {" "}
          {searchResult.map((item) => {
            return (
              <li
                className="cursor-pointer list-none"
                onClick={() => router.push(`/ProductDisplay/${item._id}`)}
              >
                {item.productName}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
