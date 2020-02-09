import React from "react";
import 'semantic-ui-css/semantic.css';
import { Search, Form, Button, Grid, Container, Card, Header, Segment } from 'semantic-ui-react';
import Axios from "axios";
import TagsBar from "./TagsBar";

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

  componentDidUpdate(prevState, prevProps) {
    console.log("PREV", prevState.queries);
    console.log("CURR", this.state.queries);
    if (this.state.queries !== prevState.queries) {
      console.log("TAG SEARCH", this.state.queries)
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
            <div className="tag-container">
              <Container>
                <Grid>
                  {tag.tasks.map(task => (
                    <Grid.Column key={task.id}>
                      <Card>
                        <Card.Content>
                          {task.name}
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))}
                </Grid>
              </Container>
            </div>
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