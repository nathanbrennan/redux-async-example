import {
  SELECT_SUBREDDIT,
  STALE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions.js'

const selectedSubreddit = (state = 'games', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
      break
    default:
      return state
  }
}

const usersById = (state = {}, action) => {
  return state
}

const postsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, action.posts)
      break;
    default:
      return state
  }
}

const subreddits = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    case STALE_SUBREDDIT:
      return Object.assign({}, state, {
        [action.subreddit]: subreddit(state[action.subreddit], action)
      })
      break
    default:
      state
  }
}

const subreddit = (state = {
  isFetching: false,
  isStale: false,
  posts: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        //isStale: false // Not sure we need this here
      })
      break
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        isStale: false,
        posts: action.posts,
        receivedAt: action.receivedAt
      })
      break
    case STALE_SUBREDDIT:
      return Object.assign({}, state, {
        isStale: true
      })
      break
    default:
      return state
  }
}

const rootReducer = (state = {}, action) => {
  return {
    selectedSubreddit: selectedSubreddit(state.selectedSubreddit, action),
    usersById: usersById(state.usersById, action),
    postsById: postsById(state.postsById, action),
    subreddits: subreddits(state.subreddits, action)
  }
}

export default rootReducer

/* EXAMPLE STATE...
{
  selectedSubreddit: 'frontend',
  usersById: {
    2: {
      id: 2,
      name: 'Andrew'
    }
  },
  postsById: {
    42: {
      id: 42,
      title: 'Confusion about Flux and Relay',
      author: 2
    },
    100: {
      id: 100,
      title: 'Creating a Simple Application Using React JS and Flux Architecture',
      author: 2
    }
  },
  subreddits: {
    frontend: {
      isFetching: true,
      isStale: false,
      posts: []
    },
    reactjs: {
      isFetching: false,
      isStale: false,
      lastUpdated: 1439478405547,
      posts: [ 42, 100 ]
    }
  }
}
*/
