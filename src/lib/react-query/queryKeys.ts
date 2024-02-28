export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_ALL_USERS = "getAllUsers",
  GET_USER_BY_ID = "getUserById",

  GET_USER_FOLLOWING = "getUserFollowing",
  GET_USER_FOLLOWERS = "getUserFollowers",

  // POST KEYS
  GET_POSTS = "getPosts",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_POST_BY_ID = "getPostById",
  GET_USER_POSTS = "getUserPosts",
  GET_USER_PROFILE_POSTS = "getUserProfilePosts",
  GET_FILE_PREVIEW = "getFilePreview",
  GET_HOME_FEED_POSTS = "getHomeFeedPosts",

  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts"
}
