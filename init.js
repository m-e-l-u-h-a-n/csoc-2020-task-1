function getTasks() {
    /***
     * @todo Fetch the tasks created by the user and display them in the dom.
     */
    $.ajax({
        headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
        },
        url: API_BASE_URL + 'todo/',
        method: 'GET',
        success: function(data, status, xhr) {
            //console.log('data = ',data);
            if(data.length){
                document.querySelector('#taskList').innerHTML = '<span class="badge badge-primary badge-pill todo-available-tasks-text">Available tasks</span> ' ;
            }
            else{
                document.querySelector('#taskList').innerHTML = '<span class="badge badge-primary badge-pill todo-available-tasks-text">No pending tasks!</span>' ;
            }
            var x,y;
            x = '<li class="list-group-item d-flex justify-content-between align-items-center"><input id="input-button-%id%" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task"><div id="done-button-%id%"  class="input-group-append hideme"><button class="btn btn-outline-secondary todo-update-task" type="button" onclick="updateTask(%id%)">Done</button></div><div id="task-%id%" class="todo-task"> %task%</div><span id="task-actions-%id%"><button style="margin-right:5px;" type="button" onclick="editTask(%id%)"class="btn btn-outline-warning"><img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png" width= "18px" height= "20px" > </button><button type="button" class="btn btn-outline-danger" onclick="deleteTask(%id%)"><img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"width="18px" height="22px"></button></span></li>';
            for(var i=0;i<data.length;i++){
                //console.log(data[i].id);
                y = x.replace(/%id%/g,data[i].id);
                y = y.replace('%task%',data[i].title);
                document.querySelector('#taskList').insertAdjacentHTML('beforeend',y);
            }
        }
    })
}

$.ajax({
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
    },
    url: API_BASE_URL + 'auth/profile/',
    method: 'GET',
    success: function(data, status, xhr) {
        document.getElementById('avatar-image').src = 'https://ui-avatars.com/api/?name=' + data.name + '&background=fff&size=33&color=007bff';
        document.getElementById('profile-name').innerHTML = data.name;
        getTasks();
    }
})
