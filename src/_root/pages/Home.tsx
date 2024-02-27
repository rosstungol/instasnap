import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Loader, PostCard } from "@/components/shared"
import { UserCard } from "@/components/shared"
import { useGetHomeFeedPosts, useGetUsers } from "@/lib/react-query/queries"
import { toast } from "@/components/ui"

const Home = () => {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isError: isErrorPosts
  } = useGetHomeFeedPosts()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  const {
    data: creators,
    isPending: isUserLoading,
    isError: isErrorCreators
  } = useGetUsers(10)

  const homeFeedPosts = data?.pages.flatMap((page) => page)

  if (!homeFeedPosts) {
    return (
      <div className='home-container'>
        <Loader />
      </div>
    )
  }

  const homeFeed = (
    <ul className='flex flex-col flex-1 gap-9 w-full'>
      {homeFeedPosts.map((post, i) => {
        if (i + 1 === homeFeedPosts.length)
          return (
            <li ref={ref} key={post.$id}>
              <PostCard post={post} />
            </li>
          )
        return (
          <li key={post.$id}>
            <PostCard post={post} />
          </li>
        )
      })}
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
    toast({ title: "Something went wrong." })
    return (
      <div className='flex flex-1'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>

          {homeFeed}

          {isFetchingNextPage && (
            <div className='mt-10'>
              <Loader />
            </div>
          )}
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
