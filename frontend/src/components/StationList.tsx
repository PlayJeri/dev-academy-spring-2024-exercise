import React from 'react'

type StationListProps = {
    stations: {
        id: number;
        name: string;
        address: string;
    }[],
}

export const StationList: React.FC<StationListProps> = ({ stations }) => {

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {stations.map((station) => (
        <div className="p-4 bg-blue-600 rounded shadow">
            <h2 className='font-bold text-xl text-white'>{station.name}</h2>
            <p className='text-white'>{station.address}</p>
        </div>
    ))}
    </div>
  )
}
