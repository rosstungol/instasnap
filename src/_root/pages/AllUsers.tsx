import { Loader } from "@/components/shared"
import UserCard from "@/components/shared/UserCard"
import { toast } from "@/components/ui"
import { useGetUsers } from "@/lib/react-query/queries"

const AllUsers = () => {
  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers()

  if (isErrorCreators) {
    toast({ title: "Something went wrong." })
    return
  }

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

      {isPending && !creators ? (
        <Loader />
      ) : (
        <ul className='user-grid'>
          {creators?.map((creator) => (
            <li key={creator.$id} className='flex-1 min-w-[200px] w-full'>
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllUsers
