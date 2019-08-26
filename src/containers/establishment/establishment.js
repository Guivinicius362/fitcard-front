import { connect } from 'react-redux';

import EstablishmentController from './establishmentController';
import * as actions from './actions/actions';

const mapStateToProps = state => {
	return {
		establishment: state.establishment,
	};
};

export default connect(
	mapStateToProps,
	{ ...actions },
)(EstablishmentController);
