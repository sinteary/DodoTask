import React from "react";
import { Icon, Label } from 'semantic-ui-react';
import Axios from "axios";

class TagsBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			let tag_name = this.state.input;
			if (tag_name.length == 0) {
				return;
			}
			this.props.current_tags.push(tag_name);
			this.setState({
				input: ""
			});
		}
	}

	deleteTag(index) {
		this.props.current_tags.splice(index, 1);
		console.log(this.props.current_tags);
		this.forceUpdate();
	}

	render() {
		const allTags = this.props.current_tags.map((tag, index) => (
			<Label color={"teal"} key={index} as='a'>
				{tag}
				<Icon name="delete" onClick={() => this.deleteTag(index)}></Icon>
			</Label >
		));
		return (
			<div className="tags">
				<div className="form-group">
					<label htmlFor="tagsbar">Tags </label>
					<input
						type="text"
						name="input"
						className="form-control"
						required
						value={this.state.input}
						onChange={(data) => {
							this.onChange(data);
						}}
						onKeyPress={this.handleKeyPress}
						style={{ background: "rgba(255,255,255,0.5)" }}
					/>
				</div >
				<div className="tag-display">
					{this.props.current_tags.length > 0 ? allTags : null}
				</div>
			</div>
		);
	}

}

export default TagsBar;