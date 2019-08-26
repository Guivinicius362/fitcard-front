import React, { Component } from 'react';
import EstablishmentView from './establishmentView';
import { Spin } from 'antd';

export class EstablishmentController extends Component {
	state = {
		modalIsVisible: false,
		currEstablishment: undefined,
		type: 'Create',
	};

	componentDidMount = () => {
		const { getEstablishment } = this.props;

		getEstablishment();
	};

	openModal = (type, currEstablishment = undefined) => {
		this.setState({ modalIsVisible: true, type, currEstablishment });
	};

	closeModal = () => {
		this.setState({ modalIsVisible: false, currEstablishment: undefined });
	};

	render = () => {
		const { establishment } = this.props;
		const { loading } = establishment;
		return (
			<>
				{loading && <Spin tip="Loading..."></Spin>}
				<EstablishmentView {...this.state} {...this} {...this.props} />
			</>
		);
	};
}

export default EstablishmentController;
