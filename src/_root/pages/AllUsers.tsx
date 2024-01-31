import { Loader } from "@/components/shared"
import { useGetUsers } from "@/lib/react-query/queries"

const AllUsers = () => {
  const { data: users } = useGetUsers()

  if (!users)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
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

      {users.map((user) => (
        <div key={user.$id} className='flex flex-col items-center'>
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt='user'
            width={90}
            height={90}
            className='rounded-full mb-4'
          />
          <h2>{user.name}</h2>
          <p>{user.username}</p>
          <button type='button' className='shad-button_primary'>
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default AllUsers
