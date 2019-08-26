import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Input, Row, Col, Divider, Select, Alert, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import InputMask from 'react-input-mask';
import { validarCNPJ } from '../utils';
const mapStateToProps = state => {
	return {
		establishment: state.establishment,
	};
};
const { Option } = Select;

export class ModalContainer extends Component {
	state = {
		status: true,
		created_at: moment(),
		category: undefined,
		phone: undefined,
		state: undefined,
		city: undefined,
		account: undefined,
		agency: undefined,
		address: undefined,
		email: undefined,
		fantasy_name: undefined,
		corporate_name: undefined,
		cnpj: undefined,
		error: false,
	};

	componentDidMount = () => {
		const { currEstablishment, postEstablishment } = this.props;

		currEstablishment &&
			this.setState({
				...currEstablishment,
				created_at:
					currEstablishment.created_at && moment(currEstablishment.created_at),
			});
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const {
			currEstablishment,
			postEstablishment,
			putEstablishment,
			closeModal,
		} = this.props;
		const { cnpj, phone, agency, account, email } = this.state;
		const body = {
			...this.state,
			cnpj: cnpj && cnpj.replace(/[^\d]+/g, ''),
			phone: phone && phone.replace(/[^\d]+/g, ''),
			agency: agency && agency.replace(/[^\d]+/g, ''),
			account: account && account.replace(/[^\d]+/g, ''),
			email: email ? email : undefined,
		};
		currEstablishment
			? putEstablishment(body).then(closeModal)
			: postEstablishment(body).then(closeModal);
	};
	handleWithResponse = response => {};
	render = () => {
		return (
			<form id="establishmentForm" onSubmit={this.onSubmit}>
				{this.state.error && (
					<Alert type="error" message="CNPJ Invalido!" banner />
				)}
				<Row gutter={16}>
					<Col span={12}>
						Razão Social
						<Input
							value={this.state.corporate_name}
							name="corporate_name"
							onChange={this.onChange}
							disableUnderline
							required
						/>
					</Col>
					<Col span={6}>
						CNPJ
						<InputMask
							mask="99.999.999/9999-99"
							value={this.state.cnpj}
							name="cnpj"
							onChange={this.onChange}
							id="cnpj"
							onBlur={e => {
								validarCNPJ(this.state.cnpj) === false &&
									this.setState({ error: true });
							}}
							onFocus={e => this.setState({ error: false })}
						>
							{inputProps => (
								<Input {...inputProps} type="tel" disableUnderline required />
							)}
						</InputMask>
					</Col>

					<Col span={6}>
						Telefone
						<InputMask
							mask="(99) 99999-9999"
							value={this.state.phone}
							name="phone"
							onChange={this.onChange}
						>
							{inputProps => (
								<Input
									{...inputProps}
									type="tel"
									disableUnderline
									required={this.state.category === 'Supermercado'}
								/>
							)}
						</InputMask>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={8}>
						Nome Fantasia
						<Input
							value={this.state.fantasy_name}
							name="fantasy_name"
							onChange={this.onChange}
							disableUnderline
						/>
					</Col>
					<Col span={8}>
						E-mail
						<Input
							value={this.state.email}
							name="email"
							onChange={this.onChange}
							disableUnderline
							type="email"
						/>
					</Col>
					<Col span={8}>
						Data de Cadastro
						<DatePicker
							name="created_at"
							placeholder="Selecione uma data"
							onChange={value =>
								this.onChange({ target: { value, name: 'created_at' } })
							}
							id="created_at"
							format={'DD/MM/YYYY'}
							value={this.state.created_at}
						/>
					</Col>
				</Row>
				<Divider>Endereço</Divider>
				<Row gutter={16}>
					<Col span={8}>
						Endereço
						<Input
							value={this.state.address}
							name="address"
							onChange={this.onChange}
							disableUnderline
						/>
					</Col>
					<Col span={8}>
						Cidade
						<Input
							value={this.state.city}
							name="city"
							onChange={this.onChange}
							disableUnderline
						/>
					</Col>
					<Col span={8}>
						Estado
						<Input
							value={this.state.state}
							name="state"
							onChange={this.onChange}
							disableUnderline
						/>
					</Col>
				</Row>
				<Divider>Observações(?)</Divider>
				<Row gutter={16}>
					<Col span={12}>
						<Select
							onChange={value =>
								this.onChange({ target: { value, name: 'category' } })
							}
							name="category"
							value={this.state.category}
							placeholder="Categoria"
						>
							<Option value="Supermercado">Supermercado</Option>
							<Option value="Restaurante">Restaurante</Option>
							<Option value="Borracharia">Borracharia</Option>
							<Option value="Posto">Posto</Option>
							<Option value="Oficina">Oficina</Option>
						</Select>
					</Col>
					<Col span={12}>
						<Select
							onChange={value =>
								this.onChange({ target: { value, name: 'status' } })
							}
							name="status"
							value={this.state.status}
							placeholder="Status"
						>
							<Option value={true}>Ativo</Option>
							<Option value={false}>Inativo</Option>
						</Select>
					</Col>
				</Row>
				<Divider>Agência e Conta</Divider>
				<Row gutter={16}>
					<Col span={12}>
						Agência
						<InputMask
							mask="999-9"
							value={this.state.agency}
							name="agency"
							onChange={this.onChange}
						>
							{inputProps => <Input {...inputProps} disableUnderline />}
						</InputMask>
					</Col>
					<Col span={12}>
						Conta
						<InputMask
							mask="99.999-9"
							value={this.state.account}
							name="account"
							onChange={this.onChange}
						>
							{inputProps => <Input {...inputProps} disableUnderline />}
						</InputMask>
					</Col>
				</Row>
			</form>
		);
	};
}

export default connect(
	mapStateToProps,
	{ ...actions },
)(ModalContainer);
