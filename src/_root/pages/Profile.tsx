import { useEffect } from "react"
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import { LikedPosts } from "."
import { GridPostItem, Loader } from "@/components/shared"
import { FollowButton } from "@/components/shared"
import { useUserContext } from "@/context/AuthContext"
import {
  useGetUserById,
  useGetUserProfilePosts
} from "@/lib/react-query/queries"

interface StabBlockProps {
  value: string | number
  label: string
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium text-light-2'>{label}</p>
  </div>
)

const Profile = () => {
  const { ref, inView } = useInView()
  const { id } = useParams()
  const { pathname } = useLocation()
  const { user } = useUserContext()
  const { data: profileUser } = useGetUserById(id || "")
  const { data, fetchNextPage, isFetchingNextPage } = useGetUserProfilePosts(
    id!
  )

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  const userPosts = data?.pages.flatMap((page) => page)
  console.log(userPosts)

  if (!profileUser || !userPosts)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  const userPostGrid = (
    <ul className='grid-container'>
      {userPosts.map((post, i) => {
        if (i + 1 === userPosts.length)
          return (
            <li ref={ref} className='relative min-w-80 h-80' key={post?.$id}>
              <GridPostItem
                user={user}
                post={post}
                showUser={false}
                showStats={true}
              />
            </li>
          )
        return (
          <li className='relative min-w-80 h-80' key={post?.$id}>
            <GridPostItem
              user={user}
              post={post}
              showUser={false}
              showStats={true}
            />
          </li>
        )
      })}
    </ul>
  )
  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img
            src={
              profileUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            className='w-36 h-36 rounded-full object-cover'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {profileUser.name}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                @{profileUser.username}
              </p>
            </div>

            <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock value={profileUser.posts.length} label='Posts' />
              <StatBlock
                value={profileUser.followers.length}
                label='Followers'
              />
              <StatBlock
                value={profileUser.following.length}
                label='Following'
              />
            </div>

            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>
              {profileUser.bio}
            </p>
          </div>

          <div className='flex justify-center gap-4'>
            {user.id === profileUser.$id ? (
              <Link
                to={`/update-profile/${profileUser.$id}`}
                className={`h-10 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg  ${
                  user.id !== profileUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt='edit'
                  width={20}
                  height={20}
                />
                <p className='flex whitespace-nowrap small-medium'>
                  Edit Profile
                </p>
              </Link>
            ) : (
              <FollowButton userId={user.id} userIdToFollow={profileUser} />
            )}
          </div>
        </div>
      </div>

      {profileUser.$id === user.id && (
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
            profileUser.posts.length === 0 ? (
              <p className='text-light-4'>No posts available</p>
            ) : (
              userPostGrid
            )
          }
        />
        <Route path='/liked-posts' element={<LikedPosts />} />
      </Routes>
      <Outlet />
      {isFetchingNextPage && (
        <div className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Profile
