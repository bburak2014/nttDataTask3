import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  
export const getMarketAsync = createAsyncThunk(
	'market/getMarketAsync',
	async () => {
		const resp = await fetch('https://snetmyapp.herokuapp.com/get_offer_count');
		if (resp.ok) {
			const market = await resp.json();
			return { market };
		}
	}
);


export const marketSlice = createSlice({
	name: 'market',
	initialState: [],
	 
	extraReducers: {
		[getMarketAsync.fulfilled]: (state, action) => {
			return action.payload.market;
		}
		
	},
});
 



  
export default marketSlice.reducer;
