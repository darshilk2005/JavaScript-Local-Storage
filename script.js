let students = [];
        let editingIndex = null;
        const storeStudents = () => {
            localStorage.setItem('students', JSON.stringify(students));
        };
        function displayStudents() {
            const tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = ""; 
    
            students.forEach((student, index) => {
                const row = `
          <tr>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.gender}</td>
          <td>${student.phone}</td>
          <td>${student.studentId}</td>
          <td>
          <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
          <button class="btn btn-danger btn-sm"
          onclick="deleteStudent(${index})">Delete</button>
          </td>
          </tr>
        `;
                tableBody.innerHTML += row;
            });
            storeStudents();
        }
    
        const loadStudents = () => {
            const storedStudents = localStorage.getItem('students');
            if (storedStudents) {
                console.log("sgdrgt")
                students = JSON.parse(storedStudents);
                displayStudents();
            } else {
                students = [];
            }
        };
    
        loadStudents(); 
        
        function addStudent(name, age, grade, gender, phone, studentId) {
            students.push({ name, age, grade, gender, phone, studentId });
            displayStudents();
        }
    
        document
            .getElementById("studentForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();
    
                const name = document.getElementById("name").value;
                const age = document.getElementById("age").value;
                const grade = document.getElementById("grade").value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const phone = document.getElementById("phone").value;
                const studentId = document.getElementById("enrollmentId").value;
                if (editingIndex !== null) {
                    students[editingIndex] = { name, age, grade, gender, phone, studentId };
                    editingIndex = null;
                } else {
                    addStudent(name, age, grade, gender, phone, studentId);
                }
    
                displayStudents();
                storeStudents(); 
                document.getElementById("studentForm").reset();
            });
    
        function editStudent(index) {
            const student = students[index];
            document.getElementById("name").value = student.name;
            document.getElementById("age").value = student.age;
            document.getElementById("grade").value = student.grade;
            document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
            document.getElementById("phone").value = student.phone;
            document.getElementById("enrollmentId").value = student.studentId;
            document.querySelector("button[type=submit]").innerText = "Save";
            editingIndex = index;
        }
    
        function deleteStudent(index) {
            students.splice(index, 1); 
            displayStudents(); 
        }
    
        const clearStudentsButton = document.getElementById('clear-students-button');
        clearStudentsButton.addEventListener('click', () => {
            localStorage.clear();
            students = [];
            displayStudents();
        });