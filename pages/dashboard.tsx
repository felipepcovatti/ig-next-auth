import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {

    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <h1>Dasboard: {user?.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})