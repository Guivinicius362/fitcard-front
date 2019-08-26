import React, { Component } from 'react';
import EstablishmentView from './establishmentView';
import { Spin } from 'antd';

export class EstablishmentController extends Component {
	state = {
		currEstablishment: undefined,
		type: 'Create',
	};

	componentDidMount = () => {
		const { getEstablishment } = this.props;

		getEstablishment();
	};

	openModal = (type, currEstablishment = undefined) => {
		const { changeStatusModal } = this.props;

		this.setState({ type, currEstablishment }, () => {
			changeStatusModal();
		});
	};

	closeModal = () => {
		const { closeModal } = this.props;
		this.setState({ currEstablishment: undefined }, () => {
			closeModal();
		});
	};

	render = () => {
		const { establishment } = this.props;
		const { loading, modalIsVisible } = establishment;
		return (
			<>
				{loading && <Spin tip="Loading..."></Spin>}
				<EstablishmentView
					{...this.state}
					{...this}
					{...this.props}
					modalIsVisible={modalIsVisible}
				/>
			</>
		);
	};
}

export default EstablishmentController;
