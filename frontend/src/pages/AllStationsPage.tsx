import axios from 'axios'
import { useEffect, useState } from 'react'
import { StationList } from '../components/StationList'

export const AllStationsPage = () => {
    const [stations, setStations] = useState([])

    useEffect(() => {
        const fetchStations = async () => {
            const stations = await axios.get("/station")
            setStations(stations.data)
        }

        fetchStations()
    }, [])

  return (
    <div>
      <h1>All Stations</h1>
        <StationList stations={stations} />
    </div>
  )
}
