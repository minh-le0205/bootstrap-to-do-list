$(document).ready(function () {
  let taskInfoStorage = JSON.parse(localStorage.getItem("taskInfo")) || [];

  if (taskInfoStorage.length != 0) {
    taskInfoStorage.forEach(function (task, index) {
      let newRow = `
            <tr>
                <th class="text-center" scope='row'>${task.task_id}</th>
                <td class="text-center">${task.task_name}</td>
                <td class="${task.task_level_css} text-center">${task.task_level}</td>
                <td class="text-center">
                    <button type='button' class='btn btn-success' id="edit-btn">
                        <i class='fa fa-edit'></i>
                    </button>
                    <button type='button' class='btn btn-danger' id="delete-btn">
                        <i class='far fa-trash-alt'></i>
                    </button>
                </td>
            </tr>`;
      $(".table tbody").append(newRow);
    });
  } else {
    let newRow = `
    <tr>
      <td colspan="4">No Data...</td>
    </tr>
    `;
    $(".table tbody").append(newRow);
  }

  $("#add_task").click(function (e) {
    e.preventDefault();
    let taskName = $("#task-name").val();
    let taskLevel = $(".task-level").val();
    let taskLevelCss =
      $(".task-level").val() == "high"
        ? "text-danger"
        : $(".task-level").val() == "medium"
        ? "text-warning"
        : "text-primary";
    let taskInfo = JSON.parse(localStorage.getItem("taskInfo")) || [];

    // Calculate the new task_id
    let newTaskId = 1;
    if (taskInfo.length > 0) {
      newTaskId = taskInfo[taskInfo.length - 1].task_id + 1;
    }

    let taskObj = {
      task_id: newTaskId,
      task_name: taskName,
      task_level: taskLevel,
      task_level_css: taskLevelCss,
    };

    taskInfo.push(taskObj);

    localStorage.setItem("taskInfo", JSON.stringify(taskInfo));
    $("#addTaskModal").modal("hide");
    location.reload();
  });

  $("#search-task-input").change(function () {
    this.value = $.trim(this.value);
  });

  $("#search-task-btn").click(function (e) {
    e.preventDefault();
    let searchValue = $("#search-task-input").val();
    let taskInfo = JSON.parse(localStorage.getItem("taskInfo")) || [];

    // Filter the taskInfo array based on the searchValue
    let filteredTasks = taskInfo.filter((task) =>
      task.task_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    // Clear the existing table rows
    $(".table tbody").empty();

    // Populate the table with filtered data
    filteredTasks.forEach(function (task, index) {
      let newRow = `
          <tr>
              <th class="text-center" scope='row'>${task.task_id}</th>
                <td class="text-center">${task.task_name}</td>
                <td class="${task.task_level_css} text-center">${task.task_level}</td>
                <td class="text-center">
                    <button type='button' class='btn btn-success' id="edit-btn">
                        <i class='fa fa-edit'></i>
                    </button>
                    <button type='button' class='btn btn-danger' id="delete-btn">
                        <i class='far fa-trash-alt'></i>
                    </button>
                </td>
          </tr>`;
      $(".table tbody").append(newRow);
    });
  });
});