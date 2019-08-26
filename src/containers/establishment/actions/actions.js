import Service from '../../../Api/ApiService';
import * as constants from '../constants/constants';

export const loading = () => {
	return {
		type: constants.LOADING,
	};
};
export const changeStatusModal = () => {
	return {
		type: constants.OPEN_MODAL,
	};
};
export const closeModal = () => {
	return {
		type: constants.CLOSE_MODAL,
	};
};
export const getEstablishment = () => async dispatch => {
	const url = constants.URL_ESTABLISHMENT;

	dispatch(loading());

	return dispatch({
		type: constants.GET_ESTABLISHMENT,
		payload: await Service({
			method: 'get',
			url,
		}),
	});
};
export const postEstablishment = establishment => async dispatch => {
	const url = constants.URL_ESTABLISHMENT;
	dispatch(loading());
	return dispatch({
		type: constants.CREATE_ESTABLISHMENT,
		payload: await Service({
			method: 'post',
			url,
			data: establishment,
		}),
	});
};
export const putEstablishment = establishment => async dispatch => {
	const url = `${constants.URL_ESTABLISHMENT}/${establishment.id}`;
	dispatch(loading());
	return dispatch({
		type: constants.EDIT_ESTABLISHMENT,
		payload: await Service({
			method: 'put',
			url,
			data: establishment,
		}),
	});
};
export const deleteEstablishment = establishment => async dispatch => {
	const url = `${constants.URL_ESTABLISHMENT}/${establishment.id}`;
	dispatch(loading());
	return dispatch({
		type: constants.DELETE_ESTABLISHMENT,
		payload: await Service({
			method: 'delete',
			url,
		}),
	});
};
