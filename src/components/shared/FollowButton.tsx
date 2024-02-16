import React, { useEffect, useState } from "react"
import { Button } from "../ui"
import { Models } from "appwrite"
import {
  useFollowUser,
  useGetUserById,
  useUnfollowUser
} from "@/lib/react-query/queries"
import { Loader } from "."

type FollowButtonProps = {
  userId: string
  userIdToFollow: Models.Document
}

const FollowButton = ({ userId, userIdToFollow }: FollowButtonProps) => {
  const [isFollowed, setIsFollowed] = useState(false)
  const { data: user } = useGetUserById(userId)

  const { mutate: followUser, isPending: isFollowingUser } = useFollowUser()
  const { mutate: unfollowUser, isPending: isUnfollowingUser } =
    useUnfollowUser()

  const followedUserRecord = user?.following.find(
    (record: Models.Document) => record.followedUser.$id === userIdToFollow.$id
  )

  useEffect(() => {
    setIsFollowed(!!followedUserRecord)
  }, [user])

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault()

    if (followedUserRecord) {
      unfollowUser(followedUserRecord.$id)
      setIsFollowed(false)
    } else {
      followUser({ userId, followedUserId: userIdToFollow.$id })
      setIsFollowed(true)
    }
  }

  return (
    <Button
      type='button'
      className='shad-button_primary'
      onClick={handleFollow}
    >
      {isFollowingUser || isUnfollowingUser ? (
        <Loader />
      ) : (
        <img
          src={"/assets/icons/follow.svg"}
          alt='edit'
          width={20}
          height={20}
          className='invert-white'
        />
      )}

      <p className='flex whitespace-nowrap small-medium'>
        {isFollowed ? "Following" : "Follow"}
      </p>
    </Button>
  )
}

export default FollowButton
