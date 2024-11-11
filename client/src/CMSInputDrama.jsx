import React from "react";
import ikuyo from "./images/ikuyoo.jpeg";
import SideBarCMS from "./components/SideBarCMS";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// const CMSInputDrama = () => {
//     return (
//         <div className="bg-gray-50">
//             <div className="container mx-auto px-4 py-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">DramaKu</h1>
//                 </div>

//                 <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
//                     <div className="w-full lg:w-1/6">
//                         <SideBarCMS selectedOption="dramas" />
//                     </div>

//                     <div className="w-full lg:w-5/6">
//                         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//                             <div className="w-full lg:w-1/5 flex flex-col items-center space-y-4">
//                                 <img className="w-full rounded-xl" src={ikuyo} alt="Drama Poster" />
//                                 <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
//                             </div>

//                             <div className="w-full lg:w-4/5">
//                                 <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//                                     <div className="w-full lg:w-1/2">
//                                         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                                         <input type="text" name="title" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
//                                         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2">
//                                             <div className="w-full lg:w-1/5">
//                                                 <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
//                                                 <select className="border border-gray-300 rounded-md px-4 py-2 w-full h-7 mt-1">
//                                                     <option></option>
//                                                 </select>
//                                             </div>
//                                             <div className="w-full lg:w-4/5">
//                                                 <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
//                                                 <input type="text" name="country" id="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-1/2">
//                                         <label htmlFor="alt-title" className="block text-sm font-medium text-gray-700">Alternative Title</label>
//                                         <input type="text" name="alt-title" id="alt-title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
//                                     </div>
//                                 </div>
//                                 <div className="w-full mt-2">
//                                     <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Synopsis</label>
//                                     <textarea name="synopsis" id="synopsis" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1 h-20"></textarea>
//                                 </div>
//                                 <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mt-2">Availability</label>
//                                 <input type="text" name="availability" id="availability" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                
//                                 <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mt-2">Add Genres</label>
//                                 <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
//                                     <label className="flex items-center">
//                                         <input type="checkbox" className="form-checkbox" />
//                                         <span className="ml-2">Action</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input type="checkbox" className="form-checkbox" />
//                                         <span className="ml-2">Adventures</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input type="checkbox" className="form-checkbox" />
//                                         <span className="ml-2">Romance</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input type="checkbox" className="form-checkbox" />
//                                         <span className="ml-2">Drama</span>
//                                     </label>
//                                     <label className="flex items-center">
//                                         <input type="checkbox" className="form-checkbox" />
//                                         <span className="ml-2">Slice of Life</span>
//                                     </label>
//                                     {/* Add more genres as needed */}
//                                 </div>
//                                 <div className="mt-4">
//                                     <label className="block text-sm font-medium text-gray-700">Add Actors (Up to 9)</label>
//                                     <input type="text" placeholder="Search Actor Names" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                            
//                                     <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                         <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
//                                             <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
//                                             <p className="text-center mt-4">Actor 1</p>
//                                             <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
//                                         </div>
//                                         <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
//                                             <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
//                                             <p className="text-center mt-4">Actor 2</p>
//                                             <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
//                                         </div>
//                                         <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
//                                             <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
//                                             <p className="text-center mt-4">Actor 3</p>
//                                             <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
//                                         </div>
//                                         {/* Add more actors as needed */}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
//                                     <div className="w-full lg:w-1/2">
//                                         <label htmlFor="trailer" className="block text-sm font-medium text-gray-700">Link Trailer</label>
//                                         <input type="text" name="trailer" id="trailer" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
//                                     </div>
//                                     <div className="w-full lg:w-1/2">
//                                         <label htmlFor="award" className="block text-sm font-medium text-gray-700">Award</label>
//                                         <select className="border border-gray-300 rounded-md px-4 py-2 w-full h-7 mt-1">
//                                             <option></option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const CMSInputDrama = () => {
    const [formData, setFormData] = useState({
        title: '',
        alt_title: '',
        year: '',
        synopsis: '',
        url_photo: '',
        country_id: 0,
        availability: '',
        genres: [],
        actors: [],
        actorsInput: '',
        trailer_link: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [actorSuggestions, setActorSuggestions] = useState([]);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        if (name === 'actorsInput') {
            fetchActors(value);
        }
    };

    const fetchActors = async (searchTerm) => {
        if (!searchTerm) {
            setActorSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/actors?search=${searchTerm}`);
            const data = await response.json();
            setActorSuggestions(data);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleRemoveActor = (actorId) => {
        setFormData((prevData) => ({
          ...prevData,
          actors: prevData.actors.filter((actor) => actor.id !== actorId),
        }));
    };
    
    const handleGenreChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            if (checked) {
                return {
                ...prevData,
                genres: [...prevData.genres, value],
                };
            } else {
                return {
                ...prevData,
                genres: prevData.genres.filter((genre) => genre !== value),
                };
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleActorClick = (actor) => {
        setFormData((prevData) => ({
            ...prevData,
            actors: [...prevData.actors, actor],
            actorsInput: '',
        }));
        setActorSuggestions([]); // Clear suggestions after selection
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let imgurUrl = formData.url_photo;
    
        if (imageFile) {
          try {
            const formData = new FormData();
            formData.append('image', imageFile);
    
            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                  Authorization: 'Client-ID c262a2036463001', // Replace with your Imgur client ID
                },
                body: formData,
            });
              
            const data = await response.json();
            console.log('Imgur response:', data);
            imgurUrl = data.data.link;
            console.log('Imgur URL:', imgurUrl);
          } catch (error) {
            console.error('Error uploading image to Imgur:', error);
            return;
          }
        }
    
        const finalFormData = {
            ...formData,
            url_photo: imgurUrl,
            actors: formData.actors.map(actor => actor.id), // Send only actor IDs
        };
    
        try {
            const response = await fetch('http://localhost:3001/new_drama', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalFormData),
            });
            // print the final form data
            console.log('Final form data:', finalFormData);

            navigate('/cms');
        } catch (error) {
          console.error('Error creating new drama:', error);
          // Handle error (e.g., show an error message)
        }
    };
      
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                <Link to="/">
                <h1 className="text-xl font-bold">DramaKu</h1>
                </Link>
                </div>

                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
                    <div className="w-full lg:w-1/6">
                        <SideBarCMS selectedOption="dramas" />
                    </div>

                    <div className="w-full lg:w-5/6">
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                            <div className="w-full lg:w-1/5 flex flex-col items-center space-y-4 mt-4">
                                <label htmlFor="imageUpload" className="cursor-pointer">
                                    {imagePreview ? (
                                    <img className="w-full rounded-xl" src={imagePreview} alt="Drama Poster" />
                                    ) : (
                                    <img className="w-full rounded-xl" src={ikuyo} alt="Drama Poster" />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="w-full lg:w-4/5">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2">
                                            <div className="w-full lg:w-2/5">
                                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                                <select
                                                name="year"
                                                id="year"
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full mt-1"
                                                value={formData.year}
                                                onChange={handleChange}
                                                >
                                                <option value="">Year</option>
                                                {/* Add year options here */}
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                                <option value="2014">2014</option>
                                                <option value="2013">2013</option>
                                                <option value="2012">2012</option>
                                                <option value="2011">2011</option>
                                                <option value="2010">2010</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-3/5">
                                                <label htmlFor="country_id" className="block text-sm font-medium text-gray-700">Country</label>
                                                <select
                                                name="country_id"
                                                id="country_id"
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full mt-1"
                                                value={formData.country_id}
                                                onChange={handleChange}
                                                >
                                                <option value="">Country</option>
                                                <option value="0">South Korea</option>
                                                <option value="1">United States</option>
                                                <option value="2">Indonesia</option>
                                                <option value="3">Japan</option>
                                                <option value="4">England</option>
                                                <option value="5">Taiwan</option>
                                                <option value="6">Germany</option>
                                                <option value="7">India</option>
                                                <option value="8">Thailand</option>
                                                </select>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                        <label htmlFor="alt_title" className="block text-sm font-medium text-gray-700">Alternative Title</label>
                                        <input
                                            type="text"
                                            name="alt_title"
                                            id="alt_title"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1"
                                            value={formData.alt_title}
                                            onChange={handleChange}
                                        />
                                        </div>
                                    </div>

                                    <div className="w-full mt-2">
                                        <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Synopsis</label>
                                        <textarea
                                        name="synopsis"
                                        id="synopsis"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1 h-20"
                                        value={formData.synopsis}
                                        onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mt-2">Availability</label>
                                    <input
                                        type="text"
                                        name="availability"
                                        id="availability"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1"
                                        value={formData.availability}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mt-2">Add Genres</label>
                                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value="Action"
                                            onChange={handleGenreChange}
                                        />
                                        <span className="ml-2">Action</span>
                                        </label>
                                        <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value="Adventures"
                                            onChange={handleGenreChange}
                                        />
                                        <span className="ml-2">Adventures</span>
                                        </label>
                                        <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value="Romance"
                                            onChange={handleGenreChange}
                                        />
                                        <span className="ml-2">Romance</span>
                                        </label>
                                        <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value="Drama"
                                            onChange={handleGenreChange}
                                        />
                                        <span className="ml-2">Drama</span>
                                        </label>
                                        <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value="Slice of Life"
                                            onChange={handleGenreChange}
                                        />
                                        <span className="ml-2">Slice of Life</span>
                                        </label>
                                        {/* Add more genres as needed */}
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="actorsInput" className="block text-sm font-medium text-gray-700">Add Actors (Up to 9)</label>
                                        <input
                                            type="text"
                                            name="actorsInput"
                                            id="actorsInput"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1"
                                            value={formData.actorsInput || ''}
                                            onChange={handleChange}
                                        />
                                        {actorSuggestions.length > 0 && (
                                            <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                                {actorSuggestions.map((actor) => (
                                                    <div key={actor.id} className="flex items-center p-2 cursor-pointer" onClick={() => handleActorClick(actor)}>
                                                        <img src={actor.url_photo} alt={actor.name} className="w-10 h-10 rounded-full mr-2" />
                                                        <span>{actor.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {Array.isArray(formData.actors) && formData.actors.length > 0 && (
                                            <div className="mt-2">
                                                <h3 className="text-sm font-medium text-gray-700">Selected Actors:</h3>
                                                <ul className="mt-1">
                                                    {formData.actors.map((actor) => (
                                                        <li key={actor.id} className="flex items-center p-2">
                                                            <img src={actor.url_photo} alt={actor.name} className="w-10 h-10 rounded-full mr-2" />
                                                            <span>{actor.name}</span>
                                                            <button
                                                                type="button"
                                                                className="ml-2 text-xs text-red-500"
                                                                onClick={() => handleRemoveActor(actor.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="trailer_link" className="block text-sm font-medium text-gray-700">Trailer Link</label>
                                        <input
                                        type="text"
                                        name="trailer_link"    
                                        id="trailer_link"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1"
                                        value={formData.trailer_link}
                                        onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <button
                                        type="submit"
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                                        >
                                        Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMSInputDrama;