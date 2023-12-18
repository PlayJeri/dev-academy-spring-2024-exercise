import axios from 'axios'
import { useEffect, useState } from 'react'
import { StationList } from '../components/StationList'
import { StationData } from '../types/'

export const AllStationsPage = () => {
    const [stations, setStations] = useState<StationData[]>([])

    useEffect(() => {
        const fetchStations = async () => {
            const stations = await axios.get(`/station`)
            setStations(stations.data)
        }

        fetchStations()
    }, [])

  return (
    <div>
        <StationList stations={stations} setStations={setStations} />
    </div>
  )
}
