import React from "react";
import 'semantic-ui-css/semantic.css';
import { Search, Form } from 'semantic-ui-react';
import Axios from "axios";
import TagsBar from "./TagsBar";

class SearchManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_tags: [],
      search_input: "",
      queries: [],
      results: [],
      tasks: [],
      loading: false
    };

  }

  componentDidMount() {
    const url = `/tags`;
    Axios.get(url)
      .then(response => {
        console.log("FETCH TAGS:", response.data);
        this.setState({
          all_tags: response.data
        })
      })
      .catch(error => {
        console.log("ERROR FETCHING TAGS: ", error)
      })
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.queries != prevState.queries) {
      const url = `/tags`
      Axios.get(url, {
        queries: this.state.queries
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log("ERROR RETRIEVING SEARCHED TAGS", error)
        })
    }
  }

  render() {
    return (
      <div className="main-body">
        <div className="search">
          <div className="search-bar">
            <Form>
              <Form.Field>
                <TagsBar
                  current_tags={this.state.queries}
                />
              </Form.Field>
            </Form>
          </div>
        </div>
        <div className="search-results">


        </div>

      </div>
    );
  }

}

export default SearchManager;