import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdoteReducer',()=>{
    test('returns new state with action VOTE',()=>{
        const state = [
            {
                content: 'If it hurts, do it more often',
                id: 0,
                votes: 0               
            }
        ]     
        const action = {
            type: 'anecdotes/voteAnecdote',
            payload: 0
        }
        deepFreeze(state)
        const newState = reducer(state, action)

        const id = action.payload

        expect(newState.find(anecdote=>anecdote.id === id).votes).toBe(1)
    })
})