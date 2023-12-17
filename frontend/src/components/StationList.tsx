import React from 'react'
import { useState } from 'react'

type StationListProps = {
    stations: {
        id: number;
        name: string;
        address: string;
    }[],
}

export const StationList: React.FC<StationListProps> = ({ stations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(stations.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto px-4'>
          {currentItems.map((station) => (
            <div key={station.id} className="p-4 bg-blue-600 rounded shadow">
                  <h2 className='font-bold text-xl text-white'>{station.name}</h2>
                  <p className='text-white'>{station.address}</p>
              </div>
          ))}
      </div>
      <div className="flex justify-center gap-5 py-8">
        <button
          className={`${currentPage === 1 ? 'bg-gray-600' : 'bg-blue-500'} text-white px-4 py-2 rounded shadow`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === totalPages}>
            Previous
        </button>
        <button
          className={`${currentPage === totalPages ? 'bg-gray-600' : 'bg-blue-500'} text-white px-4 py-2 rounded shadow`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
            Next
        </button>
      </div>
    </>
  )
}