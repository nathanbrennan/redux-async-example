import fetch from 'isomorphic-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export function selectSubreddit(subreddit) {
  return {
    type: 'SELECT_SUBREDDIT',
    subreddit
  }
}

export const STALE_SUBREDDIT = 'STALE_SUBREDDIT'
export function invalidateSubreddit(subreddit) {
  return {
    type: 'STALE_SUBREDDIT',
    subreddit
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export function requestPosts(subreddit) {
  return {
    type: 'REQUEST_POSTS',
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export function receivePosts(subreddit, json) {
  return {
    type: 'RECEIVE_POSTS',
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function shouldFetchPosts(state, subredditName) {
    const subreddit = state.subreddits[subredditName]
    if (subreddit.isFetching) {
      return false
    } else if (!subreddit.posts) {
      return true
    } else {
      return subreddit.isStale
    }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

export function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit))

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      )
  }
}
