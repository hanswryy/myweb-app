// import React from 'react';

// import Actor from './components/Actor';
// import Review from './components/Review';

// import placeholder from "./images/video_player_placeholder.png";
// import ikuyo from "./images/ikuyoo.jpeg";

// function DetailPage() {
//     return (
//         <div className="bg-gray-50">
//             <div className="container mx-auto px-4 py-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">DramaKu</h1>
//                 </div>
//                 <div className="mx-auto lg:w-2/3">
//                     <div className="flex flex-col lg:flex-row mb-6">
//                         <div className="lg:w-1/2 flex flex-row items-start">
//                             <img className="w-36 lg:w-full rounded-xl" src={ikuyo} alt="Drama Poster" />
//                         </div>
//                         <div className="lg:w-1/2 lg:pl-8">
//                             <h2 className="text-2xl font-bold mb-2 hidden lg:block">Title of the drama 1 that makes two lines</h2>
//                             <p className="text-sm mb-2 hidden lg:block">Other titles: Title 2, Title 3, Title 4</p>
//                             <p className="text-sm mb-2 hidden lg:block">Year: Spring 2024</p>
//                             <p className="text-sm mb-2 mt-4 lg:mt-0">Synopsis: Sometimes unhelpful. I don't read it thoroughly. But what helps me is the genres. I need to see genres and actors. That is what I want.</p>
//                             <p className="text-sm mb-2 hidden lg:block">Genres: Genre 1, Genre 2, Genre 3</p>
//                             <p className="text-sm mb-2 hidden lg:block">Rating: 3.5/5</p>
//                             <p className="text-sm mb-4 hidden lg:block">Availability: Fansub: @sub on X</p>
//                         </div>
//                     </div>
//                     <div className="mt-8">
//                         <h3 className="text-xl font-bold mb-4">Actors</h3>
//                         <div className="flex justify-between space-x-4 overflow-x-auto">
//                             <Actor />
//                             <Actor />
//                             <Actor />
//                             <Actor />
//                             <Actor />
//                         </div>
//                     </div>
//                     <div className="mt-8">
//                         <img className="w-full rounded-xl" src={placeholder} alt="Drama Poster" />
//                     </div>
//                     <div className="mt-8">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-l mb-4">(4) People think about this drama</h3>
//                             <div className="mb-4">
//                                 <select className="ml-4 border border-gray-300 rounded px-2 py-1">
//                                 <option>Filter by: Rating</option>
//                                 <option>Highest First</option>
//                                 <option>Lowest First</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <Review />
//                         <Review />
//                         <Review />
//                         <Review />
//                     </div>
//                     <h3 className="text-lg font-bold mb-4">Add yours!</h3>
//                     <div className="bg-white p-4 rounded shadow-lg w-full lg:w-1/2">
//                         <form>
//                             <div className="flex flex-col lg:flex-row justify-between mb-4">
//                                 <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2">Name</label>
//                                 <input
//                                     type="text"
//                                     className="w-full px-2 py-1 border border-gray-300 rounded"
//                                     placeholder="Enter your name"
//                                 />
//                             </div>

//                             <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4">
//                                 <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2">Rate</label>
//                                 <div className="flex space-x-1">
//                                     {[...Array(5)].map((_, index) => (
//                                         <span
//                                             key={index}
//                                             className="text-2xl text-gray-400 cursor-pointer"
//                                         >
//                                             ★
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="flex flex-col lg:flex-row mb-4">
//                                 <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2 align-top">Your thoughts</label>
//                                 <textarea
//                                     className="w-full px-4 py-2 border border-gray-300 rounded"
//                                     placeholder="Share your thoughts"
//                                     rows="4"
//                                 ></textarea>
//                             </div>

//                             <p className="text-xs text-gray-500 mb-4">You can only submit your comment once.</p>

//                             <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DetailPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams untuk mengambil ID dari URL
import Actor from './components/Actor';
import Review from './components/Review'; // Jika Anda menggunakan Review, tetap masukkan ini

const transformToEmbedUrl = (url) => {
    try {
        // Menggunakan regex untuk menangkap video ID dari URL
        const regex = /(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/;
        const matches = url.match(regex);
        
        if (matches && matches[1]) {
            const videoId = matches[1];
            console.log('Video ID:', videoId); // Log untuk memeriksa ID video
            return `https://www.youtube.com/embed/${videoId}`; // Mengembalikan URL embed
        } else {
            console.error('Video ID not found in URL:', url);
            return null; // Mengembalikan null jika tidak ada ID
        }
    } catch (error) {
        console.error('Invalid YouTube URL:', error);
        return null; // Mengembalikan null jika URL tidak valid
    }
};


function DetailPage() {
    const { id } = useParams(); // Ambil ID dari URL
    const [drama, setDrama] = useState(null); // State untuk menyimpan data drama
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState(null); // State untuk menyimpan error

    const fetchDrama = async () => {
        try {
            console.log('Fetching drama...'); // Log saat memulai fetch
            const response = await fetch(`/dramas/${id}`); // Menghapus query
            console.log(id);
            console.log('Response status:', response.status); // Log status respons
            if (!response.ok) {
                throw new Error('Drama not found');
            }
            const data = await response.json();
            console.log('Fetched drama data:', data); // Log data yang diambil
            setDrama(data); // Simpan data ke state
        } catch (error) {
            console.error('Error fetching drama:', error);
            setError(error.message); // Set error message
            setDrama(null); // Jika terjadi error, set drama menjadi null
        } finally {
            setLoading(false); // Set loading menjadi false setelah fetch
        }
    };

    useEffect(() => {
        fetchDrama(); // Panggil fungsi fetchDrama saat komponen di-mount
    }, [id]);    

    if (loading) {
        return <div className="text-center">Loading...</div>; // Tampilkan loading saat data sedang diambil
    }

    if (error) {
        return <div className="text-center">An error occurred: {error}</div>; // Tampilkan pesan error
    }

    if (!drama) {
        return <div className="text-center">Drama not found.</div>; // Tampilkan pesan jika drama tidak ditemukan
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">DramaKu</h1>
                </div>
                <div className="mx-auto lg:w-2/3">
                    <div className="flex flex-col lg:flex-row mb-6">
                        <div className="lg:w-1/2 flex flex-row items-start">
                            <img className="w-36 lg:w-full rounded-xl" src={drama.url_photo} alt="Drama Poster" />
                        </div>
                        <div className="lg:w-1/2 lg:pl-8">
                            <h2 className="text-2xl font-bold mb-2 hidden lg:block">{drama.title}</h2>
                            <p className="text-sm mb-2 hidden lg:block">Other titles: {drama.alternative_title || 'N/A'}</p>
                            <p className="text-sm mb-2 hidden lg:block">Year: {drama.year}</p>
                            <p className="text-sm mb-2 mt-4 lg:mt-0">Synopsis: {drama.synopsis}</p>
                            <p className="text-sm mb-2 hidden lg:block">Genres: {drama.genres.map(genre => genre.trim()).join(', ')}</p>
                            <p className="text-sm mb-4 hidden lg:block">Availability: Fansub: {drama.availability}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Actors</h3>
                        <div className="flex gap-x-10 overflow-x-auto">
                            {drama.actors && drama.actors.length > 0 ? (
                                drama.actors.map((actor, index) => (
                                    <Actor key={actor.id} name={actor.name} photo={actor.url_photo} /> // Pass actor name and photo to the Actor component
                                ))
                            ) : (
                                <p>No actors available.</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <iframe
                            className="w-full rounded-xl"
                            width="560"
                            height="380"
                            src={transformToEmbedUrl(drama.link_trailer)} // Menggunakan fungsi untuk transformasi
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
