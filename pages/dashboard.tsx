import { useEffect } from "react"
import { Can } from "../components/Can"
import { useAuth } from "../contexts/AuthContext"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut } = useAuth()

  useEffect(() => {

    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Dasboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']} roles={['administrator']}>
        <h2>Metrics</h2>
        <p>
          Lorem ipsum
        </p>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)

  const response = await apiClient.get('/me')

  console.log(response.data)

  return {
    props: {}
  }
})