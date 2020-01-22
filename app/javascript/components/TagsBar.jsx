import React from "react";
import { Icon, Label } from 'semantic-ui-react';

class TagsBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			current_tags: []
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.state = {
			input: "",
			current_tags: []
		}
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			let tag_name = this.state.input
			this.state.current_tags.push(tag_name)
			this.setState({ input: "" })
		}
	}

	render() {
		const tags = this.state.current_tags;
		const allTags = tags.map(tag => (
			<Label key={tag} as='a'>
				{tag}
				<Icon name="delete"></Icon>
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
					{this.state.current_tags.length > 0 ? allTags : null}
				</div>
			</div>
		);
	}

}

export default TagsBar;