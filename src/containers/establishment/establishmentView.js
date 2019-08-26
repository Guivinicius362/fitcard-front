import React from 'react';
import {
	Table,
	Modal,
	Button,
	Row,
	Col,
	Menu,
	Dropdown,
	Icon,
	Typography,
	PageHeader,
} from 'antd';
import ModalContainer from './container/Modal';
import moment from 'moment';
const { Paragraph } = Typography;
const columns = (openModal, deleteEstablishment) => [
	{
		title: 'Razão Social',
		dataIndex: 'corporate_name',
		key: 'corporate_name',
		width: 100,
	},
	{
		title: 'Nome Fantasia',
		dataIndex: 'fantasy_name',
		key: 'fantasy_name',
		width: 100,
	},
	{
		title: 'CNPJ',
		dataIndex: 'cnpj',
		key: 'cnpj',
		width: 100,
		render: (text, record, index) => (
			<div>{`${text &&
				text.replace(
					/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
					'$1.$2.$3/$4-$5',
				)}`}</div>
		),
	},
	{
		title: 'E-mail',
		dataIndex: 'email',
		key: 'email',
		width: 100,
	},
	{
		title: 'Endereço',
		dataIndex: 'address',
		key: 'address',
		width: 100,
	},
	{
		title: 'Cidade',
		dataIndex: 'city',
		key: 'city',
		width: 100,
	},
	{
		title: 'Estado',
		dataIndex: 'state',
		key: 'state',
		width: 100,
	},
	{
		title: 'Telefone',
		dataIndex: 'phone',
		key: 'phone',
		width: 100,
		render: (text, record, index) => (
			<div>{`${(text && text.replace(/(\d{2})(\d{9})/g, '($1) $2')) ||
				''}`}</div>
		),
	},
	{
		title: 'Data de Cadastro',
		dataIndex: 'created_at',
		key: 'created_at',
		width: 100,
		render: (text, record, index) => (
			<div>{`${(text && moment(text).format('DD/MM/YYYY')) || ''}`}</div>
		),
	},
	{
		title: 'Categoria',
		dataIndex: 'category',
		key: 'category',
		width: 100,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: 100,
		render: (text, record, index) => (
			<div>{record.status ? 'Ativo' : 'Inativo'}</div>
		),
	},
	{
		title: 'Agência',
		dataIndex: 'agencyAccount',
		key: 'agency',
		width: 100,
		render: (text, record, index) => (
			<div>{`${(record.agency &&
				record.agency.replace(/(\d{3})(\d{1})/g, '$1-$2')) ||
				''}`}</div>
		),
	},
	{
		title: 'Conta',
		dataIndex: 'agencyAccount',
		key: 'account',
		width: 100,
		render: (text, record, index) => (
			<div>
				{`${(record.account &&
					record.account.replace(/(\d{2})(\d{3})(\d{1})/g, '$1.$2-$3')) ||
					''}`}
			</div>
		),
	},
	{
		title: '',
		dataIndex: '',
		key: '',
		fixed: 'right',
		width: 100,
		render: (text, record, index) => (
			<Dropdown
				overlay={menu(openModal, record, deleteEstablishment)}
				placement="bottomCenter"
			>
				<Button>Mais Opções</Button>
			</Dropdown>
		),
	},
];

const menu = (openModal, record, deleteEstablishment) => (
	<Menu>
		<Menu.Item
			onClick={() => {
				openModal('Edit', record);
			}}
		>
			<Icon type="user" />
			Editar
		</Menu.Item>
		<Menu.Item id="teste" onClick={() => deleteEstablishment(record)}>
			<Icon type="usergroup-delete" />
			Deletar
		</Menu.Item>
	</Menu>
);
const routes = [
	{
		path: '',
		breadcrumbName: 'Home',
	},
	{
		path: 'first',
		breadcrumbName: 'Estabelecimentos',
	},
];
const EstablishmentView = ({
	modalIsVisible,
	openModal,
	closeModal,
	type,
	currEstablishment,
	establishment,
	deleteEstablishment,
}) => {
	return (
		<>
			<PageHeader title="Estabelecimentos" breadcrumb={{ routes }}>
				<Row>
					<Paragraph>
						sistema WEB de cadastro de estabelecimentos e categorias com as
						quatro funções básicas de CRUD (CREATE, READ, UPDATE e DELETE).
					</Paragraph>
				</Row>
				<Row gutter={16}>
					<Col span={2} style={{ display: 'flex', flexDirection: 'row' }}>
						<Button
							type="primary"
							onClick={() => openModal('Create')}
							id="btn-cadastrar"
						>
							<Icon type="user-add" />
							Cadastrar
						</Button>
					</Col>
				</Row>
			</PageHeader>

			<Table
				dataSource={establishment.establishments}
				columns={columns(openModal, deleteEstablishment)}
				style={{ marginTop: 10 }}
				scroll={{ x: 1500, y: 300 }}
			/>
			<Modal
				title={type === 'Create' ? 'Cadastrar Empresa' : 'Editar Empresa'}
				visible={modalIsVisible}
				onCancel={closeModal}
				width={840}
				footer={[
					<Button onClick={() => closeModal()} id="btn-close">
						Cancelar
					</Button>,
					<Button
						type="primary"
						form="establishmentForm"
						key="submit"
						htmlType="submit"
						id="btn-submit"
					>
						{type === 'Create' ? 'Cadastrar' : 'Salvar'}
					</Button>,
				]}
				destroyOnClose={true}
			>
				<ModalContainer type={type} currEstablishment={currEstablishment} />
			</Modal>
		</>
	);
};

export default EstablishmentView;
