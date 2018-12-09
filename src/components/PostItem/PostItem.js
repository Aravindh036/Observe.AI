import React, { Component } from 'react'

import './PostItem.css';
export default class PostItem extends Component {
  state={
    likes:this.props.like,
    comments:[]
  }
  likeAction=(e)=>{
    if(!e.target.classList.contains("liked")){
      e.target.classList.add("liked");
    }
    this.setState({
      likes:this.state.likes+1
    });
  }
  showComments=(e)=>{
    var node = e.target.nextSibling;
    node.classList.toggle("hide");
  }
  keyup=(e)=>{
    var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        let obj={
          content:e.target.value
        }
        let newobj = [];
        newobj = this.state.comments;
        newobj.push(obj);
        this.setState({
          comments:newobj
        })
        e.target.value = "";
      }
  }
  render() {
    sessionStorage.setItem('likes',this.state.likes)
    let comments;
    if(this.state.comments.length==0){
      let defaultComment = [1];
      comments = defaultComment.map(cmt=>{
        return <p className="default-comment">no comments</p>
      })
    }
    else{
      comments = this.state.comments.map(cmt=>{
        return <p className="comment-items">{cmt.content}</p>
      })
    }
    return (
      <div className="post-item--container">
        <div className="image-holder">
            <img src={this.props.url} alt="" />
        </div>
        <div className="like-comment">
            <div>
              <div class="heart" onClick={this.likeAction}></div>
              <div className="like-count">{sessionStorage.getItem("likes")}</div>
            </div>
            <div>
              <div className="show-comments" onClick={this.showComments}>Show comments</div>
              <div className="comment-section hide" id="comment-section-id">
                {comments}
              </div>
            </div>
        </div>
        <input className="comment" id="comment-input-id" type="text" placeholder="Add a comment..." onKeyUp={this.keyup}/>
      </div>
    )
  }
}
