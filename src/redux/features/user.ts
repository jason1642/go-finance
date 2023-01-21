import { createSlice, current,  } from '@reduxjs/toolkit'
// current import used for debugging, to log or inspect the work in progress state
import { userLogin } from '../async-actions/user-auth'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
  data: any,
  isAuthenticated: boolean,
  isLoading: boolean,
}

const initialState: UserState = {
  data: {},
  isAuthenticated: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(current(state))
        return {
            data: {
                username: 'stateusername',
                email: 'email@gmail.com'
            },
            isAuthenticated: true,
            isLoading: false
        }
   
    },
   
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(state, action)
      state.data = action.payload
      return ({...state, isAuthenticated: true})
    })
  },
})

// Action creators are generated for each case reducer function
export const { setUserState, } = userSlice.actions

export default userSlice.reducer