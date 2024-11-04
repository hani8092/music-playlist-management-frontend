"use client";

import { getPlaylists } from "@/services/playlist.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Playlists() {

    const { push } = useRouter();
    const [playlists, setPlaylists] = useState<{ description: string, name: string }[]>([])

    const fetchData = async () => {
        try {
            const playlists = await getPlaylists(localStorage.getItem("userID")!);
            console.log(playlists, "playlists");
            setPlaylists(playlists)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
            fetchData()
        }
    }, []);

    const handleEditPlaylist = (index: number) => {
        push(`playlist-form/${index}`);
    };

    return (
        <div className="text-white p-4">

            <>
                {" "}
                <header className="flex justify-between items-center p-6">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            push("/playlist-form");
                        }}
                    >
                        <h1 className="flex items-center text-3xl">
                            My Playlists
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-circle-plus mt-1.5 ml-2"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8" />
                                <path d="M12 8v8" />
                            </svg>
                        </h1>
                    </div>
                    <button
                        className="flex items-center"
                        onClick={() => {
                            localStorage.clear();
                                push("/sign-up");
                        }}
                    >
                        <span className="mr-2">Logout</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M5 10a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </header>
                <main className="px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {playlists.map((playlist: any, index) => (
                            <div
                                key={index}
                                className="bg-[#0A2533] p-4 rounded-lg shadow-lg"
                                onClick={() => handleEditPlaylist(index)}
                            >

                                <h2 className="text-xl">{playlist.name}</h2>
                                <p className="text-sm mt-2">{playlist.description}</p>

                                {/* <button className="bg-black px-1 py-1 mt-2" type="button" onClick={() => {
                                    console.log("object")
                                    push(`/playlist-form?id=${playlist._id}`)
                                }}>edit</button> */}
                            </div>
                        ))}
                        {!playlists?.length > 0 && <>No data found</>}
                    </div>

                </main>{" "}
            </>

        </div>
    );
}

export default Playlists;
