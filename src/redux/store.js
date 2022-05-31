import { configureStore } from '@reduxjs/toolkit';
 import marketSlice from './marketSlice';
export default configureStore({
	reducer: {
 		market:marketSlice,
	},
});
