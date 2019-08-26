import * as constants from '../constants/constants';
import { message as Dialog } from 'antd';
const initialState = {
	establishments: [],
	loading: false,
	modalIsVisible: false,
};

export default function(state = initialState, action) {
	try {
		switch (action.type) {
			case constants.LOADING: {
				return {
					...state,
					loading: true,
				};
			}
			case constants.OPEN_MODAL: {
				return {
					...state,
					modalIsVisible: true,
				};
			}
			case constants.CLOSE_MODAL: {
				return {
					...state,
					modalIsVisible: false,
				};
			}

			case constants.GET_ESTABLISHMENT: {
				return {
					...state,
					loading: false,
					establishments: [...action.payload],
				};
			}

			case constants.CREATE_ESTABLISHMENT: {
				const { error, message } = action.payload;

				if (error) {
					const { response } = message;
					const { data } = response;
					throw data;
				}
				Dialog.success('Estabelecimento criado com sucesso!');
				return {
					...state,
					loading: false,
					establishments: [...state.establishments, action.payload],
				};
			}
			case constants.DELETE_ESTABLISHMENT: {
				const { error } = action.payload;

				if (error) {
					const { message } = action.payload;
					const { response } = message;
					const { data } = response;
					throw data;
				}

				const newState = state.establishments.filter(
					establishment => establishment.id !== action.payload.id,
				);

				Dialog.success(action.payload.msg);
				return {
					...state,
					loading: false,
					establishments: [...newState],
				};
			}

			case constants.EDIT_ESTABLISHMENT: {
				const { error } = action.payload;

				if (error) {
					const { message } = action.payload;
					const { response } = message;
					const { data } = response;
					throw data;
				}

				const newState = state.establishments.map(establishment =>
					establishment.id === action.payload.id
						? action.payload
						: establishment,
				);

				Dialog.success('Estabelecimento alterado com sucesso!');
				return {
					...state,
					loading: false,
					establishments: [...newState],
				};
			}

			default:
				return { ...state, loading: false };
		}
	} catch (e) {
		console.log(e);

		if (e.statusCode) {
			Dialog.error(e.mensagem);
		}

		return {
			...state,
			loading: false,
		};
	}
}
