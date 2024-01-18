import { NavLink, useLocation } from "react-router-dom"
import { savedPostLinks } from "@/constants"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import Loader from "@/components/shared/Loader"
import GridPostList from "@/components/shared/GridPostList"

const Saved = () => {
  const { pathname } = useLocation()
  const { data: user } = useGetCurrentUser()

  if (!user) {
    return (
      <div className='flex flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='flex flex-1'>
      <div className='saved-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src='/assets/icons/save.svg' width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Saved Posts</h2>
        </div>

        <div className='flex-between w-full max-w-5xl mb-7'>
          <ul className='saved-links_list'>
            {savedPostLinks.map((link) => {
              const isActive = pathname === link.route

              return (
                <li key={link.label} className='saved-link_item'>
                  <NavLink
                    to={link.route}
                    className={`saved-link ${isActive && "bg-dark-3"}`}
                  >
                    <img src={link.imgURL} />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
          <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
            <p className='small-medium md:base-medium text-light-2'>All</p>
            <img
              src='/assets/icons/filter.svg'
              width={20}
              height={20}
              alt='filter'
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
          <GridPostList posts={user.posts} showUser={false} showStats={false} />
        </div>
      </div>
    </div>
  )
}

export default Saved
