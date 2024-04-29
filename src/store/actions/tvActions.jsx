export { removetv } from '../reducers/tvSlice'
import axios from "../../utils/Axios";
import { loadtv } from '../reducers/tvSlice';

export const asyncLoadtv = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalId = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        const translations = await axios.get(`/tv/${id}/translations`);

        let allDataDetails = {
            detail: detail.data,
            external_id: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(v => v.type === 'Trailer') || null,
            watchproviders: watchproviders.data.results.IN,
            translations: translations.data.translations.map(t => t.english_name),
        };
        dispatch(loadtv(allDataDetails));    
    } catch (error) {
        console.log(error);
    }
}   
