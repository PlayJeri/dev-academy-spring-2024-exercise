import axios from 'axios'
import { useEffect, useState } from 'react'
import { StationList } from '../components/StationList'
import { StationData } from '../types/'

export const AllStationsPage = () => {
    const [stations, setStations] = useState<StationData[]>([])
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        const fetchStations = async () => {
            const stations = await axios.get(`/station?order=${order}`)
            setStations(stations.data)
        }

        fetchStations()
    }, [order])

  return (
    <div>
      <h1>All Stations</h1>
        <button onClick={() => setOrder(order === "asc" ? "desc": "asc")}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
        <StationList stations={stations} />
    </div>
  )
}
