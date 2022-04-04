// alert('ok')
let  tBody = document.querySelector('#tBody');
let studentForm = document.querySelector('#studentForm');
let imageField = document.querySelector('#image');
let nameField = document.querySelector('#name');

let students = [];
let targetTr = null;
let editingStudent = null;



axios.get('http://127.0.0.1:8000/api/students').then( res =>{
    let {data} = res;

    data.forEach( item =>{
        makeStudents(item);
        // students.push(data);
    })

}).catch( err => console.log(err));




function makeStudents(student){
    tBody.innerHTML += `
<tr>
    <td> ${student.id} </td>
    <td> <img style="width: 80px; height: 80px;" src="http://127.0.0.1:8000/images/${student.image}" alt=""></td>
    <td> ${student.name}</td>
    <td>
        <button onclick="editStudent(this, ${student.id})" data-target="#test" data-toggle="modal" class="btn btn-warning">Edit</button>
        <button onclick="deleteStudent(this, ${student.id}) " class="btn btn-danger">Delete</button>
    </td>
</tr>`
}



studentForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let image = imageField.files[0];
    let name = nameField.value;

    let formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);

if (editingStudent != null){
    axios.post('http://127.0.0.1:8000/api/students/' + editingStudent.id, formData,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }).then( res =>{
        let {data} = res;

        targetTr.remove();
        targetTr.innerHTML = makeStudents(data);
        resetForm();


    }).catch( err => console.log(err));


}else {
    axios.post('http://127.0.0.1:8000/api/students', formData,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }).then( res =>{
        let {data} = res;

        makeStudents(data);
        students.push(data);

        resetForm();

    }).catch( err => console.log(err));


}

})

function deleteStudent(elm, id){
    axios.delete('http://127.0.0.1:8000/api/students/'+id).then( res =>{
      // console.log(res)
        elm.parentElement.parentElement.remove();

    }).catch( err => console.log(err));

}

function editStudent(elm, id){
    targetTr = elm.parentElement.parentElement;
    editingStudent = students.find(s => s.id === id);
    nameField.value = editingStudent.name;
    console.log(id)
}





const resetForm = () => {
    let targetTr = null;
    let editingStudent = null;

    nameField.value = "";
    imageField.value = "";

    document.querySelector('#modalClose').click();
    //
    // $('#button').text("Save");
    // $('#button').addClass('btn-success');
    // $('#button').removeClass('btn-secondary');

}
