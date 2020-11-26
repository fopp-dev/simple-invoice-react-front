import React from 'react';
import '../../scss/components/_backdrop.scss';

const Backdrop = (props) => (
	props.show ? (
		<div className="backdrop-area">
			<div className="spinner-wrapper">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	) : null
);

export default Backdrop;
