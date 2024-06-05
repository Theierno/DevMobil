function ajouterTache(){
    let task = document.getElementById("task");
    let taskListCurrent = document.getElementById("taskListCurrent");

    console.log(task.value);
    if(task.value){
        let task2 = document.createElement('li');
        task2.innerHTML = task.value;
        taskListCurrent.appendChild(task2);

        $(task2).on('swiperight', function () {
             if (this.className.indexOf('done') != -1){
               this.classList.add('done');
               taskListCurrent.append(task2);
             }
             else{
               this.classList.remove();
               taskListDone.append(task2);
            }
             
        })
        $(task2).on('swipeleft', function(){
            $(this).hide("slow", function(){
                this.remove();
            })
        })
    }
    
    $(task).val('');
    $(taskListCurrent).listview('refresh');
    $(taskListDone).listview('refresh');
    $(task).focus();
}

function reinitialiser(){
    $(taskListCurrent).empty();
    $(taskListDone).empty();
    $(taskListCurrent).listview('refresh');
    $(taskListDone).listview('refresh');

}