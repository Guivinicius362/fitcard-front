import axios from 'axios';

const Service = async ({ data, method, params, url }) => {
	return await axios({
		responseType: 'json',
		method,
		url,
		params,
		data,
	})
		.then(resp => {
			return resp.data;
		})
		.catch(err => {
			return { error: true, message: err };
		});
};

export default Service;
