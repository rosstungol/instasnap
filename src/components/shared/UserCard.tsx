import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { FollowButton, Loader } from "."
import { useGetCurrentUser } from "@/lib/react-query/queries"

type UserCardProps = {
  user: Models.Document
}

const UserCard = ({ user }: UserCardProps) => {
  const { data: currentUser } = useGetCurrentUser()

  if (!currentUser) {
    return (
      <div className='user-card'>
        <Loader />
      </div>
    )
  }

  return (
    <Link to={`/profile/${user.$id}`} className='user-card'>
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt='creator'
        className='w-14 h-14 rounded-full object-cover'
      />
      <div className='flex-center flex-col gap-2'>
        <p className='base-medium text-light-1 text-center line-clamp-1'>
          {user.name}
        </p>
        <p className='small-regular text-light-3 text-center line-clamp-1'>
          {user.username}
        </p>
      </div>

      {currentUser.$id !== user.$id && (
        <FollowButton userId={currentUser.$id} currentUser={user} />
      )}
    </Link>
  )
}

export default UserCard
