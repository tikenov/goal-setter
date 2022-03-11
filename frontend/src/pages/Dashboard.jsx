import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalForm from "../components/GoalForm"
import { getGoals, reset } from "../features/goals/goalSlice"
import Spinner from "../components/Spinner"
import GoalItem from "../components/GoalItem"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const {
    goals,
    isError,
    isLoading,
    isSuccess,
    message } = useSelector(state => state.goals)

  useEffect(() => {
    if (isError) {

    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getGoals())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading)
    return <Spinner />

  return (<>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals dashboard</p>
    </section>
    <GoalForm />
    <section className="content">
      {goals.length > 0 ? goals.map(
        goal => <GoalItem key={goal._id} goal={goal} />) :
        <h3>You do not have any goals</h3>}
    </section>
  </>)
}

export default Dashboard