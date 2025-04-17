"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res?.json())
      .then((res) => setPost(res));
  }, []);
  const onSearch = (e) => {
    if(e.type == 'keydown' && e.key !== 'Enter'){
      return
    }
    setSearch(true);
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef?.current?.value
    )
      .then((res) => res?.json())
      .then((res) => setPost(res));
    setSearch(false);
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here youb can read the latest articles</p>
      </main>
      <div className="flex justify-end px-4 pb-4">
        <input
          ref={inputRef}
          onKeyDown={onSearch}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
          disabled={search}
        >
          {search ? "..." : "Search"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {post?.map((data, index) => (
          <Link key={index} href={"/post/" + data?._id}>
            <div key={index} className="border border-gray-200 p-4">
              <img
                className="w-full h-58 object-cover mb-4"
                src={data?.image}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{data?.title}</h2>
              <p className="text-gray-600">{data?.short_description}</p>
            </div>
          </Link>
        ))}
        {post?.length < 1 && inputRef?.current?.value && (
          <p>No Data Available For This Current Search</p>
        )}
        {/* <!-- Add more posts here --> */}
      </div>
    </>
  );
}
