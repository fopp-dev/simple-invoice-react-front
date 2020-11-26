import React from 'react';
import {config} from "../../config";

class DownloadFile extends React.Component {

	constructor(props) {
		super(props);
	}

	downloadEmployeeData = () => {
		const {link, filename} = this.props;
		fetch(config.domain + '/' + link)
			.then(response => {
				response.blob()
					.then(blob => {
						let url = window.URL.createObjectURL(blob);
						let a = document.createElement('a');
						a.href = url;
						a.download = filename;
						a.click();
					})
			});
	}

	render() {
		const {name} = this.props;
		return (
			<label
				style={{cursor: 'pointer'}}
				onClick={this.downloadEmployeeData}
			>
				{name}
				&nbsp;
				<i className='fa fa-download'/>
			</label>
		)
	}

}

export default DownloadFile;
