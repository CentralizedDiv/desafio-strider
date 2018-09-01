import { createStore, combineReducers, applyMiddleware } from 'redux'
import tasks from './reducers/tasks'
import promise from 'redux-promise'
const reducer = combineReducers({
 tasks
})
const store = createStore(
 reducer,
 applyMiddleware(promise)
)
export default store;