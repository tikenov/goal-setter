import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

export const createGoal = createAsyncThunk('goals/create',
  async (goalData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    try {
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
  }
})


export const { reset } = goalSlice.actions
export default goalSlice.reducer
