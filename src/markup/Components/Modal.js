import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

class ModalDialog extends Component {
	render() {
		const {
			show,
			title,
			content,
			okText,
			cancelText,
			onClickOk,
			onClickCancel,
		} = this.props;

		return (
			<Modal
				isOpen={show}
				className={this.props.className}
			>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>
					{content}
				</ModalBody>
				<ModalFooter>
					{
						okText && (
							<Button color="primary" onClick={onClickOk}>
								{okText}
							</Button>
						)
					}
					&nbsp;
					{
						cancelText && (
							<Button color="secondary" onClick={onClickCancel}>
								{cancelText}
							</Button>
						)
					}
				</ModalFooter>
			</Modal>
		);
	}
}

export default ModalDialog;
