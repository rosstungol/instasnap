import { Models } from "appwrite"
import { Loader, PostCard } from "@/components/shared"
import { useGetHomeFeedPosts, useGetUsers } from "@/lib/react-query/queries"
import UserCard from "@/components/shared/UserCard"
import { useUserContext } from "@/context/AuthContext"

const Home = () => {
  const { user } = useUserContext()
  const { data: homeFeedPosts, isError: isErrorPosts } = useGetHomeFeedPosts(
    user.id
  )

  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators
  } = useGetUsers(10)

  if (!homeFeedPosts) {
    return (
      <div className='home-container'>
        <Loader />
      </div>
    )
  }

  const homeFeed =
    homeFeedPosts.length === 0 ? (
      <p className='text-light-4'>No post available.</p>
    ) : (
      <ul className='flex flex-col flex-1 gap-9 w-full'>
        {homeFeedPosts.map((post: Models.Document) => (
          <PostCard post={post} key={post.$id} />
        ))}
      </ul>
    )

  const topCreators =
    isUserLoading && !creators ? (
      <Loader />
    ) : (
      <ul className='grid 2xl:grid-cols-2 gap-6'>
        {creators?.map((creator) => (
          <li key={creator.$id}>
            <UserCard user={creator} />
          </li>
        ))}
      </ul>
    )

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className='flex flex-1'>
        <div className='home-container'>
          <p className='body-medium text-light-1'>Something went wrong.</p>
        </div>
        <div className='home-creators'>
          <p className='body-medium text-light-1'>Something went wrong.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {homeFeed}
        </div>
      </div>

      <div className='home-creators'>
        <h3 className='h3-bold text-light-1'>Top Creators</h3>
        {topCreators}
      </div>
    </div>
  )
}

export default Home
