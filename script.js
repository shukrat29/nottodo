let taskList = [];
const entryElm = document.getElementById('entryList');
const badElm = document.getElementById('badList');

const tWkHr = 7 * 24;

const handleOnSubmit = (form) => {
  //   console.log(document.getElementById("task").value);

  const newForm = new FormData(form);

  const task = newForm.get('task');
  const hr = +newForm.get('hr');
  const obj = {
    task,
    hr,
    type: 'entry',
    id: randomIdGenerator(),
  };

  //check if you have enough hour left to fit this incoming task

  const previousTtl = total();
  if (previousTtl + hr > tWkHr) {
    return alert('Sorry boss not enought time letf!');
  }

  taskList.push(obj);
  console.log(taskList);
  display();
  total();
};

const display = () => {
  let str = ``;
  const temArg = taskList.filter((item) => item.type === 'entry');
  temArg.forEach((item, i) => {
    console.log(item);
    str += `
   <tr>
<th>${i + 1}</th>
<td>${item.task}</td>
<td>${item.hr}hrs</td>
<td class="text-end">
  <button onclick="handOnDelete('${item.id}')" class="btn btn-danger btn-sm">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button onclick="switchTask('${
    item.id
  }', 'bad')" class="btn btn-success btn-sm">
    <i class="fa-sharp fa-solid fa-arrow-right-long"></i>
  </button>
</td>
</tr>`;
  });

  entryElm.innerHTML = str;
  displayBadList();
};

const displayBadList = () => {
  let str = ``;
  let totalBadhours = 0;

  const temArg = taskList.filter((item) => item.type === 'bad');
  temArg.forEach((item, i) => {
    console.log(item);
    str += `
   <tr>
<th>${i + 1}</th>
<td>${item.task}</td>
<td>${item.hr}hrs</td>
<td class="text-end">
 
  <button onclick="switchTask('${
    item.id
  }', 'entry'" class="btn btn-warning btn-sm">
    <i class="fa-sharp fa-solid fa-arrow-left-long"></i>
  </button>
  <button onclick="handOnDelete('${item.id}')" class="btn btn-danger btn-sm">
  <i class="fa-solid fa-trash"></i>
</button>
</td>
</tr>`;
  });

  badElm.innerHTML = str;

  // totoal bad hr calculation
  // show in the element

  const badHrs = temArg.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  document.getElementById('badHrs').innerText = badHrs;
};

//[{task: "dd", hr:"88"}]

const total = () => {
  const ttl = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  document.getElementById('ttlHrs').innerText = ttl;
  return ttl;
};

const handOnDelete = (id) => {
  if (window.confirm('Are you sure, you want to delete the item?')) {
    taskList = taskList.filter((item) => item.id !== id);
    display();
    total();
  }
};

const switchTask = (id, type) => {
  console.log(id, type);

  taskList = taskList.map((item) => {
    if (item.id === id) item.type = type;

    return item;
  });
  display();
};

const randomIdGenerator = () => {
  const idLength = 6;
  const str = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890';

  let id = '';
  for (let i = 0; i < idLength; i++) {
    const randomPosition = Math.floor(Math.random() * str.length);
    id += str[randomPosition];
  }
  return id;
};
