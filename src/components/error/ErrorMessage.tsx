import { Button } from "../ui"

const ErrorMessage = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className='flex-center p-8'>
      <div className='flex flex-col items-center border border-dark-4 rounded-[20px] p-8 m-8 gap-2'>
        <p className='base-medium text-light-1'>Something went wrong</p>
        <p className='small-regular text-light-3  mb-2'>
          An error occurred. Please reload the page.
        </p>
        <Button onClick={reloadPage} className='shad-button_primary'>
          Reload Page
        </Button>
      </div>
    </div>
  )
}

export default ErrorMessage
