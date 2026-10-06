import { Navigate } from 'react-router-dom'

// Client accounts and user access are managed together so the admin cannot create
// an account in one screen and see a different list in another.
export default function Users(){ return <Navigate to="/admin/clients" replace /> }
