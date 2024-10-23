"use client"
import { createPlaylist, getSongs } from '@/services/playlist.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from 'antd';

function PlaylistForm({ edit }: { edit: boolean }) {

    const { Option } = Select;

    const [songs, setSongs] = useState<{ id: String; name: string, refLink: string, albumName: string; image: string }[]>([]);
    const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);

    const handleChangeForSongs = (value: string[]) => {
        setSelectedSongIds(value);
    };

    const handleSearch = async (value: string) => {
        if (value) {
            const data = await getSongs(value);
            if (data?.length > 0) {
                const transformedSongs = data.map((song: any) => {
                    return {
                        id: song.id, name: song.name,
                        refLink: song.external_urls.spotify,
                        albumName: song.album.name,
                        image: song.album.images[0]?.url || '',
                    };
                });

                setSongs(transformedSongs);
            }

        } else {
            setSongs([]);
        }
    };
    const { push } = useRouter();

    const [formData, setFormData] = useState({
        description: "",
        name: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const validateForm = () => {
        let errorMessages: { [key: string]: string } = {};

        if (!formData.name) {
            errorMessages.name = "Name is required";
        }

        if (!formData.description) {
            errorMessages.description = "Description is required";
        }

        setErrors(errorMessages);

        return Object.keys(errorMessages).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm() && localStorage.getItem("userID")) {
            try {

                const data = {
                    name: formData.name,
                    description: formData.description,
                    userID: localStorage.getItem("userID")!
                };
                const res = await createPlaylist(data)
                console.log(res)
                if (res?._id) {
                    toast.success('Playlist added successfully', {
                        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
                    });

                    setTimeout(() => {
                        push("/");
                    }, 2000);
                }


            }
            catch (error) {
                console.error("Error", error);
            }
        } else {
            console.log("Form has errors", errors);
        }
    };

    return (
        <div className="text-white flex items-center justify-center p-4 md:p-6">
            <ToastContainer />
            <div className="p-2 md:p-8 w-full max-w-4xl">
                <h2 className="text-2xl md:text-3xl md:mb-6">
                    {edit ? "Edit Playlist" : "Create a new playlist"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full px-3 py-2 text-gray-300 bg-[#224957] rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                        {errors.name && (
                            <p className="text-[#EB5757] text-xs mt-1.5 ml-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full px-3 py-2 text-gray-300 bg-[#224957] rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                        {errors.description && (
                            <p className="text-[#EB5757] text-xs mt-1.5 ml-1">
                                {errors.description}
                            </p>
                        )}
                    </div>


                    <div className="mb-6"> <label className="my-4">Spotify songs</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handleChangeForSongs}
                            showSearch
                            onSearch={handleSearch}
                            filterOption={false
                            }
                            value={selectedSongIds}
                        >
                            {songs.map((song: any, index) => (
                                <Option key={index} value={song.id}>
                                    {song.name} - {song.albumName}
                                </Option>
                            ))}
                        </Select></div>
                    <div className="flex justify-start gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                push("/");
                            }}
                            className="text-white bg-transparent border border-gray-300 hover:bg-[#224957] font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-[#2BD17E] hover:bg-green-600 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2"
                        >
                            Submit
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default PlaylistForm


