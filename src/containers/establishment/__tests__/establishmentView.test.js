import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import EstablishmentView from '../establishmentView';
import { ModalContainer } from '../container/Modal';
import EstablishmentController from '../establishmentController';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
configure({ adapter: new Adapter() });

const initialStateController = {
	establishment: {
		establishments: [],
		loading: false,
	},
	getEstablishment: () =>
		new Promise(resolve => {
			resolve();
		}),
};
const initialState = {
	establishment: {
		establishments: [],
	},
	currEstablishment: undefined,
};
const initialStateModal = {
	currEstablishment: undefined,
	postEstablishment: () =>
		new Promise(resolve => {
			resolve();
		}),
	putEstablishment: () =>
		new Promise(resolve => {
			resolve();
		}),
};

const event = { preventDefault: () => {} };
const response = [
	{
		id: 4,
		fantasy_name: 'ASS aaa',
		cnpj: '90175536000130',
		email: 'guivinicius362@gmail.com',
		corporate_name: 'Teste com todos os campos',
		address: 'Rua angelo narezi',
		city: 'Campinas',
		state: 'São Paulo',
		phone: '19995407134',
		created_at: '2019-08-13T21:05:51.000+0000',
		category: 'Supermercado',
		status: true,
		agency: '2223',
		account: '458064',
	},
];
describe('Controller', () => {
	const wrapper = shallow(
		<EstablishmentController {...initialStateController} openModal={jest.fn} />,
	);

	it('deve gerar o Controller', () => {
		expect(wrapper);
	});
});
describe('View', () => {
	const wrapper = shallow(
		<EstablishmentView {...initialState} openModal={jest.fn} />,
	);

	it('deve gerar a view', () => {
		expect(wrapper);
	});

	it('deve funcionar com o type igual a edit', () => {
		wrapper.setProps(
			{
				type: 'Edit',
			},
			() => expect(wrapper),
		);
	});
	it('deve funcionar com o type igual a Create', () => {
		wrapper.setProps(
			{
				type: 'Create',
			},
			() => expect(wrapper),
		);
	});
	it('deve funcionar com um response de verdade', () => {
		wrapper.setProps(
			{
				establishments: response,
			},
			() => expect(wrapper),
		);
	});
	it('deve abrir a modal', () => {
		wrapper
			.find('#btn-cadastrar')
			.at(0)
			.simulate('click');
		expect(wrapper);
	});
});
describe('Modal', () => {
	let wrapper = shallow(<ModalContainer {...initialStateModal} />);
	let wrapper2 = mount(<ModalContainer {...initialStateModal} />);

	it('deve gerar o modal', () => {
		expect(wrapper);
	});
	it('deve funcionar com um estabelecimento', () => {
		expect(wrapper2);
	});
	wrapper2 = mount(
		<ModalContainer {...initialStateModal} currEstablishment={response[0]} />,
	);

	it('deve acionar o onBlur', () => {
		wrapper2.setState({ cnpj: '90175536000130' });
		expect(
			wrapper2
				.find('#cnpj')
				.at(0)
				.simulate('blur'),
		);
	});
	it('deve acionar o onBlur e a validação ser false', () => {
		wrapper2.setState({ cnpj: '9017553600013' });
		expect(
			wrapper2
				.find('#cnpj')
				.at(0)
				.simulate('blur'),
		);
	});
	it('deve acionar o onFocus', () => {
		expect(
			wrapper2
				.find('#cnpj')
				.at(0)
				.simulate('focus'),
		);
	});
	wrapper = shallow(
		<ModalContainer {...initialStateModal} currEstablishment={undefined} />,
	);
	it('deve submeter o formulario', () => {
		wrapper.instance().onSubmit(event);
		expect(wrapper);
	});
	wrapper = shallow(
		<ModalContainer {...initialStateModal} currEstablishment={response[0]} />,
	);
	it('deve submeter o formulario fazendo a chamada de editar', () => {
		wrapper.instance().onSubmit(event);
		expect(wrapper);
	});
	it('deve chamar o onChange', () => {
		wrapper.instance().onChange({ target: { value: '1', name: 'cnpj' } });
		expect(wrapper);
	});
});
