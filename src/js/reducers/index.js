import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../../actions.js'

const initialState = {
  selectedSubreddit: '',
  usersById: {},
  postsById: {}
  postsBySubreddit: {}
}

const selectedSubreddit = (state = 'games', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      state = action.subreddit
      break;
    default:
      state
  }
}

const postsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, action.posts)
      break;
    default:
      state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      state[action.subreddit] = Object.assign({}, state[action.subreddit], {
        isFetching: true
      })
      break
    case RECEIVE_POSTS:
      state[action.subreddit] = Object.assign({}, state[action.subreddit], {
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        receivedAt: action.receivedAt
      })
      break
    case INVALIDATE_SUBREDDIT:
      state[action.subreddit] = Object.assign({}, state[action.subreddit], {
        didInvalidate: true
      })
      break
    default:
      state
  }
}

const rootReducer = (state = initialState, action) => {
  return {
    selectedSubreddit: selectedSubreddit(state.selectedSubreddit, action),
    usersById: usersById(state.usersById, action),
    postsById: postsById(state.postsById, action),
    postsBySubreddit: postsBySubreddit(state.postsBySubreddit, action)
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
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  }
}
*/
