import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom"
import { useGetUserById } from "@/lib/react-query/queries"
import { GridPostList, Loader } from "@/components/shared"
import { useUserContext } from "@/context/AuthContext"
import { LikedPosts } from "."

const Profile = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(id || "")

  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            width={150}
            height={150}
            className='rounded-full'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {currentUser.name}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                @{currentUser.username}
              </p>
            </div>

            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>
              {currentUser.bio}
            </p>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className='flex max-w-5xl w-full'>
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src='/assets/icons/posts.svg'
              alt='posts'
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src='/assets/icons/like.svg'
              alt='likes'
              width={20}
              height={20}
            />
            Likes
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={
            <GridPostList
              posts={currentUser.posts}
              showStats={false}
              showUser={false}
            />
          }
        />
        <Route path='/liked-posts' element={<LikedPosts />} />
      </Routes>
      <Outlet />
    </div>
  )
}

export default Profile
