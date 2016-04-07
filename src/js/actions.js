export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const STALE_SUBREDDIT = 'STALE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function seletSubreddit(subreddit) {
  return {
    type: 'SELECT_SUBREDDIT',
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: 'STALE_SUBREDDIT',
    subreddit
  }
}

export function requestPosts(subreddit) {
  return {
    type: 'REQUEST_POSTS',
    subreddit
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: 'RECEIVE_POSTS',
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
