import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as moment from "moment";

class CreditLogModalDialog extends Component {
	state = {
		excelStr: ''
	};

	makeObjectFromString = (str) => {
		const rows = str.split('\n');
		let installments = [];
		let invoice = {};

		for (let i = 0; i < rows.length; i++) {
			const values = rows[i].split('\t');

			if (i === 0) {
				invoice['customer'] = values[0];
				invoice['amount'] = values[1];
				invoice['date'] = moment(values[2]).format('YYYY-MM-DD');
				invoice['invoiceNumber'] = values[3];
			}

			installments[i] = {};

			for (let j = 0; j < values.length; j++) {
				switch (j) {
					case 5:
						installments[i]['date'] = moment(values[j]).format('YYYY-MM-DD');
						break;
					case 6:
						installments[i]['amount'] = values[j];
						break;
					default:
						break;
				}
			}
		}

		return {
			invoice,
			installments,
		}
	}

	onClickOk = () => {
		const data = this.makeObjectFromString(this.state.excelStr);
		const {
			onClickImport
		} = this.props;

		onClickImport(data);
	}

	render() {
		const {
			show,
			onClickCancel,
		} = this.props;
		const {excelStr} = this.state;

		return (
			<Modal
				isOpen={show}
				size={'xl'}
				className={this.props.className}
			>
				<ModalHeader>
					Import from Excel
				</ModalHeader>
				<ModalBody>
					<div className='row'>
						<div className='col-12 form-group'>
							<textarea
								className='form-control pt-3'
								rows={10}
								value={excelStr}
								onChange={(e) => this.setState({excelStr: e.target.value})}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={this.onClickOk}>
						Import
					</Button>
					<Button color="primary" onClick={onClickCancel}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({

		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreditLogModalDialog);
