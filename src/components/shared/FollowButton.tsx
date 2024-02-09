import { useState } from "react"
import { Button } from "../ui"
import { Models } from "appwrite"
import { useGetUserById } from "@/lib/react-query/queries"

type FollowButtonProps = {
  userId: string
  currentUser: Models.Document
}

const FollowButton = ({ userId, currentUser }: FollowButtonProps) => {
  const [isFollowed, setIsFollowed] = useState(false)
  const { data: user } = useGetUserById(userId)

  const handleFollow = () => {}

  return (
    <Button type='button' className='shad-button_primary '>
      <img
        src={"/assets/icons/follow.svg"}
        alt='edit'
        width={20}
        height={20}
        className='invert-white'
        onClick={handleFollow}
      />
      <p className='flex whitespace-nowrap small-medium'>
        {isFollowed ? "Following" : "Follow"}
      </p>
    </Button>
  )
}

export default FollowButton
