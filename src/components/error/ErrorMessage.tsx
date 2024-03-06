import { useNavigate } from "react-router-dom"
import { Button } from "../ui"

const ErrorMessage = () => {
  const navigate = useNavigate()
  const redirectToHome = () => {
    navigate("/")
    window.location.reload()
  }

  return (
    <div className='flex-center p-8'>
      <div className='flex flex-col border border-dark-4 rounded-[20px] p-8 m-8 gap-4'>
        <h1 className='body-bold md:h3-bold'>Something went wrong</h1>
        <Button onClick={redirectToHome} className='shad-button_primary'>
          Go to Home Feed
        </Button>
      </div>
    </div>
  )
}

export default ErrorMessage
