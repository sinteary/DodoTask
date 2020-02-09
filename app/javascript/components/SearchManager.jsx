import React from "react";
import 'semantic-ui-css/semantic.css';
import { Search, Form, Button, Grid, Container, Card, Header, Segment } from 'semantic-ui-react';
import Axios from "axios";
import TagsBar from "./TagsBar";
import TaskCards from "./TaskCards";

class SearchManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_tags: [],
      search_input: "",
      queries: [],
      tasks: [],
      loading: false,
      result_tags: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const url = `/users/${this.props.user_id}`;
    Axios.get(url)
      .then(response => {
        console.log("FETCH TAGS:", response.data);
        this.setState({
          all_tags: response.data.tags
        })
      })
      .catch(error => {
        console.log("ERROR FETCHING TAGS: ", error)
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldRefresh !== prevProps.shouldRefresh) {
      if (this.props.shouldRefresh) {
        this.handleSearch();
        this.props.toggleRefresh();
      }
    }
  }

  handleSearch() {
    console.log("QUERIES:", this.state.queries);
    const url = `/tags`;
    Axios.get(url, {
      params: {
        queries: this.state.queries,
        user_id: this.props.user_id
      }
    })
      .then(response => {
        console.log("RESULTS:", response.data);
        this.setState({
          result_tags: response.data
        })
      })
      .catch(error => {
        console.log("ERROR FETCHING RESULTS:", error);
      })
  }

  render() {
    const allTagslist = this.state.result_tags.map(tag => (
      <div key={tag.id} className="tagslist">
        <Grid.Row>
          <Segment raised>
            <Header>{tag.name}</Header>
            {tag.tasks.length > 0 ?
              <div className="tag-container">
                <Container>
                  <Grid>
                    <TaskCards
                      tasks={tag.tasks}
                      editTask={this.props.editTask}
                      getTasks={this.props.toggleRefresh}
                    />
                  </Grid>
                </Container>
              </div>
              : <p>No tasks with this tag.</p>}
          </Segment>
        </Grid.Row>
      </div>
    ));


    return (
      <div>

        <div className="search-body">
          <div>
            <div className="search-component">
              <div className="search-bar">
                <Form>
                  <TagsBar
                    current_tags={this.state.queries}
                  />
                </Form>
              </div>
              <div className="search-button">
                <Button icon="search" onClick={this.handleSearch}></Button>
              </div>
            </div>
          </div>

        </div>

        <div>
          <Grid>
            {allTagslist}
          </Grid>
        </div>

      </div>
    );
  }

}

export default SearchManager;