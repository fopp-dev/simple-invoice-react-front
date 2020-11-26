import React, {Component} from 'react';

const treeArr = [
	{
		id: 1,
		name: '02 Apr 2020',
		amount: 35456,
		children: [
			{
				id: 2,
				name: 'ABC Reseller Inc',
				amount: 10000,
			},
			{
				id: 3,
				name: 'DEF Reseller Inc',
				amount: 20000,
			},
			{
				id: 4,
				name: 'GHI Reseller Inc',
				amount: 30000,
				children: [
					{
						id: 6,
						name: 'Invoice 23456',
						amount: 4545,
					},
					{
						id: 7,
						name: 'Invoice 34567',
						amount: 4545
					}
				]
			}
		]
	}
];

class TreeView extends Component {
	state = {
		people: this.props.data,
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {data} = this.props;
		if (prevProps.data !== data) {
			this.setState({people: data});
		}
	}

	render() {
		const people = this.state.people;
		const nodes = people.map((i, key) =>
			<TreeNode
				node={i}
				children={i.children}
				depth={1}
				key={key}
				visibleReadLeafIcon={this.props.visibleReadLeafIcon}
				visibleUpdateLeafIcon={this.props.visibleUpdateLeafIcon}
				onClickCommentEdit={this.props.onClickCommentEdit}
			/>
		)

		return (
			<ul>{nodes}</ul>
		);
	}
}

class TreeNode extends Component {
	state = {
		isVisible: false,
	};

	toggle = () => {
		this.setState({
			isVisible: !this.state.isVisible
		});
	};

	onClickLeafIcon = () => {
		const {
			installment_id,
			installment_comment,
		} = this.props.node;

		this.props.onClickCommentEdit(installment_id, installment_comment, this.props.visibleUpdateLeafIcon);
	}

	render() {
		const icon = this.state.isVisible ? (
			<i
				className='fa fa-minus-circle'
				style={{cursor: 'pointer'}}
			/>
		) : (
			<i
				className='fa fa-plus-circle'
				style={{cursor: 'pointer'}}
			/>
		);

		const leafIcon = this.props.node.installment_comment ? (
			this.props.visibleReadLeafIcon &&
			<i
				className='fa fa-flag'
				style={{cursor: 'pointer', color: 'red'}}
				onClick={this.onClickLeafIcon}
			/>
		) : (
			this.props.visibleUpdateLeafIcon &&
			<i
				className='fa fa-edit'
				style={{cursor: 'pointer'}}
				onClick={this.onClickLeafIcon}
			/>
		);

		let span;
		let nodes;

		if (this.props.children) {
			span = <span className="icon" onClick={this.toggle}>{icon}</span>;

			nodes = this.props.children.map((i, subKey) =>
				<TreeNode
					node={i}
					children={i.children}
					key={this.props.depth + '-' + subKey}
					index={subKey}
					depth={this.props.depth + 1}
					visibleReadLeafIcon={this.props.visibleReadLeafIcon}
					visibleUpdateLeafIcon={this.props.visibleUpdateLeafIcon}
					onClickCommentEdit={this.props.onClickCommentEdit}
				/>
			);
		} else {
			span = <span className="icon">{leafIcon}</span>;
		}

		return (
			<li className='mt-2 mb-2' style={{position: 'relative', left: '10px'}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: `${80 -  3 * (this.props.depth - 1)}%`,
						paddingRight: `${(this.props.depth - 1) * 10}%`,
						paddingLeft: `${3 * (this.props.depth - 1)}%`,
						backgroundColor: `${this.props.index % 2 === 0 ? '#f2f2f2' : '#fff'}`
					}}>
					<div>
						{span}
						&nbsp;&nbsp;
						<label style={{cursor: 'pointer'}} onClick={this.toggle}>
							{this.props.node.name}
						</label>
					</div>

					<div>
						<label>
							{this.props.node.amount}
						</label>
					</div>
				</div>
				<ul style={!this.state.isVisible ? {display: 'none'} : null}>
					{nodes}
				</ul>
			</li>
		)
	}
}

export default TreeView;
