import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateInstallmentCommentAction} from "../../../redux/actions/partner";

class InstallmentCommentModal extends Component {
	state = {
		comment: this.props.comment,
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {comment, show} = this.props;

		if (prevProps.show !== show) {
			this.setState({
				comment: comment,
			});
		}
	}

	onClickOk = () => {
		const {comment} = this.state;
		const {id, updateInstallmentComment, onClickCancel} = this.props;

		updateInstallmentComment(id, {comment});
		onClickCancel();
	}

	render() {
		const {
			editable,
			show,
			onClickCancel,
		} = this.props;
		const {comment} = this.state;

		return (
			<Modal
				isOpen={show}
				size={'md'}
				className={this.props.className}
			>
				<ModalHeader>
					Comment
				</ModalHeader>
				<ModalBody>
					<div className='row'>
						<div className='col-12 form-group'>
							<textarea
								className='form-control pt-3'
								value={comment}
								disabled={!editable}
								rows={6}
								onChange={(e) => this.setState({comment: e.target.value})}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					{
						editable &&
						<Button color="primary" onClick={this.onClickOk}>
							Save
						</Button>
					}
					<Button color="primary" onClick={onClickCancel}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
		updateInstallmentComment: updateInstallmentCommentAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(InstallmentCommentModal);
