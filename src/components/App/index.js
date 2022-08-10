import { useState } from "react";

import "./App.css";
const initialData = [
  {
    title: "Task 0",
    creator: "Phat",
    status: "New",
    descript: "This is a new task 0",
    taskID: 0,
  },
  {
    title: "Task 1",
    creator: "Phat 1",
    status: "New",
    descript: "This is a new task 1",
    taskID: 1,
  },
  {
    title: "Task 2",
    creator: "Phat 2",
    status: "New",
    descript: "This is a new task 2",
    taskID: 2,
  },
  {
    title: "Task 3",
    creator: "Phat 3",
    status: "New",
    descript: "This is a new task 3",
    taskID: 3,
  },
  {
    title: "Task 4",
    creator: "Phat 4",
    status: "New",
    descript: "This is a new task 4",
    taskID: 4,
  },
  {
    title: "Task 5",
    creator: "Phat 5",
    status: "New",
    descript: "This is a new task 5",
    taskID: 5,
  },
  {
    title: "Task 6",
    creator: "Phat 6",
    status: "New",
    descript: "This is a new task 6",
    taskID: 6,
  },
];
// Fake API when receive data from server
/*
  Promise là 1 đối tượng dùng để tạo đoạn mã bất đồng bộ cho javascript
  Khởi tạo bằng cách truyền 1 "function callback" với 2 đối số là resolve và reject
  2 đối số resolve và reject đều là function 
  Tất cả các code bất đồng bộ sẽ nằm trong "function callback"
  Nếu mọi thứ thành công, thì Promise sẽ được hoàn thành và hàm resolve sẽ được gọi
  Trong trường hợp xảy ra lỗi, thì hàm Reject sẽ được gọi với 1 đối tượng Error
*/

// Promise is a object that contains both producing code and cosuming code

// Khi khởi tạo đối tượng Promise, các khối lệnh bên trong là Producing code
const myPromise = new Promise((resolve, reject) => {
  // Producing code (It may take some time)
  let i = 0;
  if (i === 0) {
    resolve(); // When successfull
  } else reject("error"); // When error
});
// Khi gọi đối tượng và các method của nó thì gọi là Consuming code
myPromise.then(function (data) {
  console.log(data);
});

// const callAsyncData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve({ data: initialData });
//     }, 2000);
//   });
// };

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <h1>Demo Practice</h1>

      {isLoading && (
        <div className="d-flex ">
          <p> Data is loading...</p>
          <img
            src="/image/loading_icon.gif"
            style={{ height: "100px" }}
            alt=""
          ></img>
        </div>
      )}
    </div>
  );
}

export default App;
