import React, { Component } from 'react';
import './App.css';
import searchIcon from './assets/search.png';
import user from './assets/user.png';

import PostItem from './components/PostItem/PostItem';
class App extends Component {
  state={
    posts:[],
  }
  componentWillMount(){
    fetch("http://starlord.hackerearth.com/insta")
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      this.setState({
        posts:res
      });
    })
    
  }
  render() {
    let i=0;
    let posts = this.state.posts.map(post=>{
      i+=1;
      return <PostItem url = {post.Image} like = {post.likes} time = {post.timestamp} key={i}
      />
    })
    return (
      <div className="app">
       <nav className="app-nav">
         <div className="div-inner">
           <span>Instagram</span>
           <div className="search">
              <input className="search-input" type="text" placeholder="search"/>
              <img className="search-icon"  src={searchIcon} alt=""/>
           </div>
         </div>
       </nav>
      <div className="post-container">
        <div className="posts">
            <div className="user-post">
              <div className="user-icon">
                <img src={user} alt=""/>
                <span>Observe.AI</span>
              </div>
              <button>Add Story</button>
            </div>
            {posts}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
