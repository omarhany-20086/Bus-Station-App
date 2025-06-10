import type React from "react"
import { Link } from "react-router-dom"

interface RouteItem {
  path: string
  name: string
}

interface RoutesListProps {
  routes: RouteItem[]
}

const RoutesList: React.FC<RoutesListProps> = ({ routes }) => {
  return (
    <div>
      <h2>Available Routes:</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RoutesList
