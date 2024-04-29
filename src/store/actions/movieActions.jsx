export { removemovie } from '../reducers/movieSlice'
import axios from "../../utils/Axios";
import { loadmovie } from '../reducers/movieSlice';

export const asyncLoadMovie = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalId = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        const translations = await axios.get(`/movie/${id}/translations`);

        let allDataDetails = {
            detail: detail.data,
            external_id: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(v => v.type === 'Trailer') || null,
            watchproviders: watchproviders.data.results.IN,
            translations: translations.data.translations.map(t => t.english_name),
        };
        dispatch(loadmovie(allDataDetails));    
    } catch (error) {
        console.log(error);
    }
}   

