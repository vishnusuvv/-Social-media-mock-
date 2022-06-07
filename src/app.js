import { http } from './http';
import { ui } from './ui';

//Get post on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for Add post

document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for delete

document.querySelector('#post').addEventListener('click',deletePost);

//Listen for edit

document.querySelector('#post').addEventListener('click',editPost);

//listen for Cancel

document.querySelector('.card-form').addEventListener('click',cancelEdit)


function getPosts(){
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
    const data = {
        title,
        body
    }
    if ( body==="" || title==="" ){
        
        ui.showAlert('please Fill in All Fields Properly','alert alert-danger container');
    }
    else{
        //check for id
        if(id===''){
            //create post
            http.post('http://localhost:3000/posts',data)
                .then(data => {
                    ui.showAlert('Post Added!','alert alert-success container');
                    ui.clearFields();
                    getPosts(); 
                })
                .catch(err => console.log(err));

        }
        else{
            //update post
            http.put(`http://localhost:3000/posts/${id}`,data)
                .then(data => {
                    ui.showAlert('Post Updated!','alert alert-success container');
                    ui.changeFormState('add');
                    getPosts(); 
                })
                .catch(err => console.log(err));
        }

    
    }


}

function deletePost(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post Removed', 'alert alert-danger container mt-5');
                    getPosts();
                })
                .catch(err => console.log(err))
        }
        
    }
}

function editPost(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id =e.target.parentElement.dataset.id;
        const title = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.textContent
        const body = e.target.parentElement.parentElement.previousElementSibling.lastElementChild.textContent;
        console.log(id+' '+title+' '+body +" end")
        const data={
            id,
            title,
            body
        }
        //fill form
        ui.fillForm(data);
    } 
    e.preventDefault();
}
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
}

const greeting = 'Hello World';
console.log(greeting);

const show = document.querySelector('.navbar-toggler');
const sidebar = document.querySelector('#navbarCollapse');
const close = document.querySelector('.close-btn');
show.addEventListener('click',() => {  
  sidebar.classList.toggle('sidebar--show');
})
close.addEventListener('click',() => {  
  sidebar.classList.remove('sidebar--show');
})