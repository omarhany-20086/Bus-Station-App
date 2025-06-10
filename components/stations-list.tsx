import type React from "react"
import type { Station } from "../types"

interface StationsListProps {
  stations: Station[]
}

const StationsList: React.FC<StationsListProps> = ({ stations }) => {
  return (
    <div>
      <h2>Stations</h2>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            {station.name} ({station.code})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StationsList
