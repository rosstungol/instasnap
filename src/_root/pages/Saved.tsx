import { NavLink, useLocation } from "react-router-dom"
import { savedPostLinks } from "@/constants"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import Loader from "@/components/shared/Loader"
import GridPostList from "@/components/shared/GridPostList"

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  if (!currentUser) {
    return (
      <div className='flex flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='saved-container'>
      <div className='flex gap-2 w-full max-w-5xl'>
        <img
          src='/assets/icons/save.svg'
          width={36}
          height={36}
          alt='save'
          className='invert-white'
        />
        <h2 className='h3-bold md:h2-bold text-left w-full'>Saved Posts</h2>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        <GridPostList
          posts={currentUser.save}
          showUser={false}
          showStats={false}
        />
      </div>
    </div>
  )
}

export default Saved
