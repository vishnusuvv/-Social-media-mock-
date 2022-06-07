class UI {
    constructor(){
        this.posts = document.querySelector('#post');
        this.titleInput = document.querySelector('#title');
        this.bodyinput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';

    }
    showPosts(posts){
        let output = '';
        posts.forEach((post) => {
            output +=`
                <div class="card mb-3">
                    <div class="card-body position-relative">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                    </div>
                    <div class="post-action">
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        this.posts.innerHTML = output;

    }
    showAlert(msg, className){
        this.clearAlert();

        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.postsContainer')
        const posts = document.querySelector('.postsContainer .container:nth-child(2) ');
        container.insertBefore(div,posts);
        setTimeout(()=>{
            this.clearAlert();
        },3000) 
    }
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove(); 
        }

    }
    clearFields(){
        this.titleInput.value="";
        this.bodyinput.value="";
    }
    //ffill form to edit

    fillForm(data){
        this.titleInput.value = data.title;
        this.idInput.value = data.id
        this.bodyinput.value = data.body;
        this.changeFormState('edit')
    }
    clearIdInput(){
        this.idInput.value='';
    }

    changeFormState(state){
        if(state === 'edit' ){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'btn bg-success btn-block post post-submit mb-3 mt-4';
            const cancelbtn = document.createElement('button');
            cancelbtn.classList = "post post-cancel btn bg-warning btn-block my-3";
            cancelbtn.appendChild(document.createTextNode('Cancel Edit'));

            const cardForm =document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');

            cardForm.insertBefore(cancelbtn,formEnd)
        }
        else{
            this.postSubmit.textContent = 'Post It!';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block mt-4 align-self-end mb-2';   
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }
            this.clearIdInput();
            this.clearFields();
        }
    }
}

export const ui = new UI();