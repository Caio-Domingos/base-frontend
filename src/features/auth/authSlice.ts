/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthService, type AuthUser } from 'api/supabase/auth.service'

export interface AuthState {
	user?: AuthUser
	isLoggedIn: boolean
}

const initialState: AuthState = {
	isLoggedIn: false
}

export const login = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; password: string }) => {
		const service = new AuthService()
		const response = await service.login(credentials)
		console.log('login response', response)

		return response
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (credentials: { email: string; password: string }) => {
		const service = new AuthService()
		const response = await service.register(credentials)
		console.log('register response', response)

		return response
	}
)

export const getUser = createAsyncThunk('auth/getUser', async () => {
	const service = new AuthService()
	const response = await service.getUser()
	console.log('getUser response', response)

	return response
})

export const logout = createAsyncThunk('auth/logout', async () => {
	const service = new AuthService()
	await service.logout()
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload
			state.isLoggedIn = true
		})

		builder.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload
			state.isLoggedIn = true
		})

		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload
			state.isLoggedIn = true
		})

		builder.addCase(logout.fulfilled, state => {
			state.user = undefined
			state.isLoggedIn = false
		})
	}
})
