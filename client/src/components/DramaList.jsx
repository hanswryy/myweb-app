import React, { useEffect, useState } from 'react';
import Card from './Card'; // Import your Card component

const DramaList = () => {
    const [dramas, setDramas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const dramasPerPage = 12;

    useEffect(() => {
        const fetchDramas = async () => {
            const response = await fetch(`/dramas?page=${currentPage}&limit=${dramasPerPage}`);
            const data = await response.json();
            console.log(data);
            setDramas(data);
        };

        const fetchTotalCount = async () => {
            const response = await fetch('/count');
            const data = await response.json();
            setTotalCount(data.count);
        }

        fetchDramas();
    }, [currentPage]);


    const totalPages = Math.ceil(totalCount / dramasPerPage);

    return (
        <div>
            <h1>Dramas</h1>
            <div className="drama-list">
                {dramas.map(drama => (
                    <Card key={drama.id} drama={drama} user={userID} />
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DramaList;
