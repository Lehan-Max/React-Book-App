import React, {Component} from 'react';
import './App.css';
import httpService from './services/httpService';
import config from './config.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = { 
      posts: []
   }

  async componentDidMount() {
    const { data: posts } = await httpService.get(config.apiEndpoint);
    this.setState({ posts })
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' }
    const {data: post} = await httpService.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts })
  }

  handleUpdate = async post => {
    const originalPost = {...post};
    post.title = "Updated Post with id " + post.id;
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post }
    this.setState({ posts })
    try{
      await httpService.put(config.apiEndpoint + '/'+ post.id, post)
      // axios.patch(config+ '/'+ post.id, {title: post.title})
    } catch(ex) {
      alert('Something Went wrong while Update!')
      posts[index] = {...originalPost}
      this.setState({ posts })
    }
  }

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts })
    try{
      await httpService.delete(config.apiEndpoint + '/' + post.id)
    } catch(ex) {
      if (ex.response && ex.response.status === 404)
        alert('Something went wrong while deleting!');
      this.setState({ posts: originalPosts })
    }
  }  
    

  render() {

    const { posts } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary add" onClick={this.handleAdd}>Add</button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button 
                        className="btn btn-info btn-sm" 
                        onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
 
export default App;
