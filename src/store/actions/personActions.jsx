export { removeperson } from '../reducers/personSlice'
import axios from "../../utils/Axios";
import { loadperson } from '../reducers/personSlice';

export const asyncLoadperson = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);


        let allDataDetails = {
            detail: detail.data,
            external_id: externalId.data,
            combined_credit: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data,
        };
        dispatch(loadperson(allDataDetails));
    } catch (error) {
        console.log(error);
    }
}   
