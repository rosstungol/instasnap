import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Loader } from "@/components/shared"
import UserCard from "@/components/shared/UserCard"
import { toast } from "@/components/ui"
import { useGetAllUsers } from "@/lib/react-query/queries"

const AllUsers = () => {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isError: isErrorCreators
  } = useGetAllUsers()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  const creators = data?.pages.flatMap((page) => page)

  if (!creators) {
    return (
      <div className='common-container'>
        <Loader />
      </div>
    )
  }

  if (isErrorCreators) {
    toast({ title: "Something went wrong." })
    return
  }

  const userGrid = (
    <ul className='user-grid'>
      {creators.map((creator, i) => {
        if (i + 1 === creators.length)
          return (
            <li
              ref={ref}
              key={creator?.$id}
              className='flex-1 min-w-[200px] w-full'
            >
              <UserCard user={creator!} />
            </li>
          )
        return (
          <li key={creator?.$id} className='flex-1 min-w-[200px] w-full'>
            <UserCard user={creator!} />
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className='common-container'>
      <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
        <img
          src='/assets/icons/people.svg'
          width={36}
          height={36}
          alt='add'
          className='invert-white'
        />
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
      </div>

      {userGrid}
      {isFetchingNextPage && (
        <div className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default AllUsers
