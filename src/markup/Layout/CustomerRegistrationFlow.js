import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {CUSTOMER_OVERVIEW_FLOWS} from "../../constants";
import history from "../../history";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: {max: 4000, min: 3000},
		items: 9
	},
	desktop: {
		breakpoint: {max: 3000, min: 1024},
		items: 9
	},
	tablet: {
		breakpoint: {max: 1024, min: 464},
		items: 5
	},
	mobile: {
		breakpoint: {max: 464, min: 0},
		items: 3
	}
};

class CustomerRegistrationFlow extends Component {
	state = {
		flows: CUSTOMER_OVERVIEW_FLOWS,
	};

	navigateTo = (path) => {
		history.push({
			pathname: path,
		});
	};

	render() {
		const {flows} = this.state;
		const {id} = this.props;

		return (
			<Carousel
				ssr={true}
				partialVisbile
				itemClass="image-item"
				responsive={responsive}
				autoPlay={false}
				infinite={false}
				deviceType={this.props.deviceType}
				removeArrowOnDeviceType={["mobile"]}
			>
				{
					flows && flows.map((flow, key) => (
						<div
							key={key}
							className={`text-white p-3 mb-2 ml-1 text-center ` + (flow.path ? 'bg-success' : 'bg-secondary')}
							style={{borderRadius: '5px', height: '90%', cursor: flow.path ? 'pointer' : 'default'}}
							onClick={() => flow.path && this.navigateTo(flow.path(id))}
						>
							{flow.title}
						</div>
					))
				}
			</Carousel>
		)
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)
(CustomerRegistrationFlow);
