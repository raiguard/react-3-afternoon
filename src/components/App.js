import React, { Component } from "react";

import "./App.css";

import Post from "./Post/Post";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      baseUrl: "https://practiceapi.devmountain.com/api/",
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    Axios.get(`${this.state.baseUrl}posts`)
      .then((result) => this.setState({ posts: result.data }))
      .catch(() => console.log("Failed to retrieve posts"));
  }

  updatePost(id, text) {
    Axios.put(`${this.state.baseUrl}posts?id=${id}`, { text })
      .then((result) => this.setState({ posts: result.data }))
      .catch(() => console.log("Failed to update post"));
  }

  deletePost(id) {
    Axios.delete(`${this.state.baseUrl}posts?id=${id}`)
      .then((result) => this.setState({ posts: result.data }))
      .catch(() => console.log("Failed to delete post"));
  }

  createPost(text) {
    Axios.post(`${this.state.baseUrl}posts`, { text })
      .then((result) => this.setState({ posts: result.data }))
      .catch(() => console.log("Failed to create post"));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map((post) => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
