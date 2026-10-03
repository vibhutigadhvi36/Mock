// ============================================
// STUDENT RESULT MANAGEMENT SYSTEM
// ============================================


// ============================================
// DEFAULT STUDENT DATA
// ============================================

const defaultStudents = [
    {
        rollNo: 101,
        name: "Aarav Sharma",
        course: "BCA",
        math: 85,
        science: 78,
        english: 92
    },
    {
        rollNo: 102,
        name: "Priya Singh",
        course: "B.Sc",
        math: 76,
        science: 69,
        english: 80
    },
    {
        rollNo: 103,
        name: "Rohan Kumar",
        course: "B.Com",
        math: 45,
        science: 52,
        english: 48
    },
    {
        rollNo: 104,
        name: "Sneha Patel",
        course: "BCA",
        math: 92,
        science: 88,
        english: 85
    },
    {
        rollNo: 105,
        name: "Vikram Mehta",
        course: "B.Sc",
        math: 61,
        science: 57,
        english: 65
    },
    {
        rollNo: 106,
        name: "Ananya Gupta",
        course: "B.Com",
        math: 38,
        science: 42,
        english: 40
    },
    {
        rollNo: 107,
        name: "Karan Verma",
        course: "BCA",
        math: 79,
        science: 81,
        english: 76
    },
    {
        rollNo: 108,
        name: "Meera Iyer",
        course: "B.Sc",
        math: 68,
        science: 72,
        english: 70
    }
];


// ============================================
// LOAD STUDENTS
// ============================================

let savedStudents =
    localStorage.getItem("students");

let students;

if (savedStudents) {

    students = JSON.parse(savedStudents);

} else {

    students = [...defaultStudents];

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ============================================
// SAVE STUDENTS
// ============================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ============================================
// CALCULATE TOTAL
// ============================================

function calculateTotal(student) {

    return (
        Number(student.math) +
        Number(student.science) +
        Number(student.english)
    );

}


// ============================================
// CALCULATE PERCENTAGE
// ============================================

function calculatePercentage(student) {

    let total = calculateTotal(student);

    return ((total / 300) * 100).toFixed(1);

}


// ============================================
// CALCULATE GRADE
// ============================================

function calculateGrade(percentage) {

    percentage = Number(percentage);

    if (percentage >= 80) {

        return "A";

    } else if (percentage >= 70) {

        return "B";

    } else if (percentage >= 60) {

        return "C";

    } else if (percentage >= 40) {

        return "D";

    } else {

        return "F";

    }

}


// ============================================
// CALCULATE STATUS
// ============================================

function calculateStatus(percentage) {

    return Number(percentage) >= 40
        ? "Pass"
        : "Fail";

}


// ============================================
// GET TABLE BODY
// ============================================

function getTableBody() {

    return document.getElementById(
        "results-table-body"
    );

}


// ============================================
// DISPLAY STUDENTS
// ============================================

function displayStudents(data = students) {

    const tableBody = getTableBody();

    if (!tableBody) {

        console.error(
            "ERROR: results-table-body not found."
        );

        return;

    }


    tableBody.innerHTML = "";


    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="11"
                    style="text-align:center; padding:30px;">
                    No students found
                </td>
            </tr>
        `;

        return;

    }


    data.forEach(function(student) {

        const total =
            calculateTotal(student);

        const percentage =
            calculatePercentage(student);

        const grade =
            calculateGrade(percentage);

        const status =
            calculateStatus(percentage);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.rollNo}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.math}</td>

            <td>${student.science}</td>

            <td>${student.english}</td>

            <td>${total}</td>

            <td>${percentage}%</td>

            <td>
                <span class="badge-grade ${grade.toLowerCase()}">
                    ${grade}
                </span>
            </td>

            <td>
                <span class="badge-status ${status.toLowerCase()}">
                    ${status}
                </span>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit"
                        onclick="editStudent(${student.rollNo})"
                        title="Edit">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="action-btn delete"
                        onclick="deleteStudent(${student.rollNo})"
                        title="Delete">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    updateDashboard();

}


// ============================================
// UPDATE DASHBOARD
// ============================================

function updateDashboard() {

    const totalStudents =
        students.length;


    let passedStudents = 0;

    let failedStudents = 0;

    let totalPercentage = 0;


    students.forEach(function(student) {

        const percentage =
            Number(
                calculatePercentage(student)
            );


        totalPercentage += percentage;


        if (percentage >= 40) {

            passedStudents++;

        } else {

            failedStudents++;

        }

    });


    let averagePercentage = 0;


    if (totalStudents > 0) {

        averagePercentage =
            (
                totalPercentage /
                totalStudents
            ).toFixed(1);

    }


    // YOUR CURRENT HTML IDs

    const totalElement =
        document.getElementById(
            "total-students"
        );

    if (totalElement) {

        totalElement.textContent =
            totalStudents;

    }


    const passedElement =
        document.getElementById(
            "total-passed"
        );

    if (passedElement) {

        passedElement.textContent =
            passedStudents;

    }


    const failedElement =
        document.getElementById(
            "total-failed"
        );

    if (failedElement) {

        failedElement.textContent =
            failedStudents;

    }


    const averageElement =
        document.getElementById(
            "avg-percentage"
        );

    if (averageElement) {

        averageElement.textContent =
            averagePercentage + "%";

    }


    // PASS RATE

    const passRate =
        document.getElementById(
            "pass-rate"
        );


    if (passRate) {

        let rate = 0;


        if (totalStudents > 0) {

            rate =
                (
                    passedStudents /
                    totalStudents *
                    100
                ).toFixed(1);

        }


        passRate.textContent =
            rate + "%";

    }

}


// ============================================
// CREATE THE COMPLETE FORM
// ============================================

function setupForm() {

    const form =
        document.getElementById(
            "result-form"
        );


    if (!form) {

        console.error(
            "ERROR: result-form not found."
        );

        return;

    }


    // Replace current small form
    // with complete form

    form.innerHTML = `

        <div style="padding:10px 0;">

            <input
                type="text"
                id="studentName"
                placeholder="Student Name"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >


            <input
                type="number"
                id="rollNo"
                placeholder="Roll No"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >


            <select
                id="course"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >

                <option value="">
                    Select Course
                </option>

                <option value="BCA">
                    BCA
                </option>

                <option value="B.Sc">
                    B.Sc
                </option>

                <option value="B.Com">
                    B.Com
                </option>

            </select>


            <input
                type="number"
                id="math"
                placeholder="Math Marks"
                min="0"
                max="100"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >


            <input
                type="number"
                id="science"
                placeholder="Science Marks"
                min="0"
                max="100"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >


            <input
                type="number"
                id="english"
                placeholder="English Marks"
                min="0"
                max="100"
                required
                style="
                    width:100%;
                    margin-bottom:10px;
                    padding:8px;
                    box-sizing:border-box;
                "
            >


            <button
                type="submit"
                class="btn btn-submit btn-block"
            >

                <i class="fa-solid fa-save"></i>

                Save Result

            </button>

        </div>

    `;

}


// ============================================
// ADD STUDENT
// ============================================

function addStudent(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const rollNo =
        Number(
            document.getElementById(
                "rollNo"
            ).value
        );


    const course =
        document.getElementById(
            "course"
        ).value;


    const math =
        Number(
            document.getElementById(
                "math"
            ).value
        );


    const science =
        Number(
            document.getElementById(
                "science"
            ).value
        );


    const english =
        Number(
            document.getElementById(
                "english"
            ).value
        );


    // VALIDATION

    if (
        name === "" ||
        !rollNo ||
        course === ""
    ) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    if (
        math < 0 ||
        math > 100 ||
        science < 0 ||
        science > 100 ||
        english < 0 ||
        english > 100
    ) {

        alert(
            "Marks must be between 0 and 100."
        );

        return;

    }


    // DUPLICATE ROLL NUMBER

    const duplicate =
        students.some(function(student) {

            return (
                Number(student.rollNo) ===
                rollNo
            );

        });


    if (duplicate) {

        alert(
            "This Roll No already exists."
        );

        return;

    }


    // CREATE STUDENT

    const newStudent = {

        rollNo: rollNo,

        name: name,

        course: course,

        math: math,

        science: science,

        english: english

    };


    // ADD TO ARRAY

    students.push(newStudent);


    // SAVE

    saveStudents();


    // DISPLAY

    displayStudents();


    // CLEAR FORM

    document
        .getElementById("result-form")
        .reset();


    alert(
        "Result added successfully!"
    );

}


// ============================================
// DELETE STUDENT
// ============================================

function deleteStudent(rollNo) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;

    }


    const index =
        students.findIndex(function(student) {

            return (
                Number(student.rollNo) ===
                Number(rollNo)
            );

        });


    if (index === -1) {

        return;

    }


    students.splice(index, 1);


    saveStudents();


    displayStudents();


    alert(
        "Student deleted successfully!"
    );

}


// ============================================
// EDIT STUDENT
// ============================================

function editStudent(rollNo) {

    const student =
        students.find(function(student) {

            return (
                Number(student.rollNo) ===
                Number(rollNo)
            );

        });


    if (!student) {

        return;

    }


    document.getElementById(
        "studentName"
    ).value =
        student.name;


    document.getElementById(
        "rollNo"
    ).value =
        student.rollNo;


    document.getElementById(
        "course"
    ).value =
        student.course;


    document.getElementById(
        "math"
    ).value =
        student.math;


    document.getElementById(
        "science"
    ).value =
        student.science;


    document.getElementById(
        "english"
    ).value =
        student.english;


    const form =
        document.getElementById(
            "result-form"
        );


    form.setAttribute(
        "data-edit-roll",
        student.rollNo
    );


    const button =
        form.querySelector(
            "button[type='submit']"
        );


    if (button) {

        button.innerHTML =
            '<i class="fa-solid fa-save"></i> Update Result';

    }


    form.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ============================================
// UPDATE STUDENT
// ============================================

function updateStudent(rollNo) {

    const index =
        students.findIndex(function(student) {

            return (
                Number(student.rollNo) ===
                Number(rollNo)
            );

        });


    if (index === -1) {

        return;

    }


    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const newRollNo =
        Number(
            document.getElementById(
                "rollNo"
            ).value
        );


    const course =
        document.getElementById(
            "course"
        ).value;


    const math =
        Number(
            document.getElementById(
                "math"
            ).value
        );


    const science =
        Number(
            document.getElementById(
                "science"
            ).value
        );


    const english =
        Number(
            document.getElementById(
                "english"
            ).value
        );


    if (
        name === "" ||
        !newRollNo ||
        course === ""
    ) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    if (
        math < 0 ||
        math > 100 ||
        science < 0 ||
        science > 100 ||
        english < 0 ||
        english > 100
    ) {

        alert(
            "Marks must be between 0 and 100."
        );

        return;

    }


    // Check duplicate roll number

    const duplicate =
        students.some(function(student, i) {

            return (
                i !== index &&
                Number(student.rollNo) ===
                newRollNo
            );

        });


    if (duplicate) {

        alert(
            "This Roll No already exists."
        );

        return;

    }


    // UPDATE

    students[index] = {

        rollNo: newRollNo,

        name: name,

        course: course,

        math: math,

        science: science,

        english: english

    };


    saveStudents();


    displayStudents();


    const form =
        document.getElementById(
            "result-form"
        );


    form.reset();


    form.removeAttribute(
        "data-edit-roll"
    );


    const button =
        form.querySelector(
            "button[type='submit']"
        );


    if (button) {

        button.innerHTML =
            '<i class="fa-solid fa-save"></i> Save Result';

    }


    alert(
        "Result updated successfully!"
    );

}


// ============================================
// FORM SUBMIT
// ============================================

function setupFormSubmit() {

    const form =
        document.getElementById(
            "result-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            const editRoll =
                this.getAttribute(
                    "data-edit-roll"
                );


            if (editRoll) {

                event.preventDefault();

                updateStudent(
                    Number(editRoll)
                );

            } else {

                addStudent(event);

            }

        }
    );

}


// ============================================
// SEARCH
// ============================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "table-search-input"
        );


    if (!searchInput) {

        return;

    }


    searchInput.addEventListener(
        "input",
        function() {

            const value =
                this.value
                .trim()
                .toLowerCase();


            const filtered =
                students.filter(
                    function(student) {

                        return (

                            student.name
                                .toLowerCase()
                                .includes(value)

                            ||

                            String(
                                student.rollNo
                            ).includes(value)

                            ||

                            student.course
                                .toLowerCase()
                                .includes(value)

                        );

                    }
                );


            displayStudents(filtered);

        }
    );

}


// ============================================
// COURSE FILTER
// ============================================

function setupCourseFilter() {

    const dropdowns =
        document.querySelectorAll(
            ".filter-dropdown"
        );


    if (dropdowns.length < 1) {

        return;

    }


    const courseDropdown =
        dropdowns[0];


    // Add course options

    courseDropdown.innerHTML = `

        <option value="All Courses">
            All Courses
        </option>

        <option value="BCA">
            BCA
        </option>

        <option value="B.Sc">
            B.Sc
        </option>

        <option value="B.Com">
            B.Com
        </option>

    `;


    courseDropdown.addEventListener(
        "change",
        function() {

            const course =
                this.value;


            if (
                course ===
                "All Courses"
            ) {

                displayStudents();

                return;

            }


            const filtered =
                students.filter(
                    function(student) {

                        return (
                            student.course ===
                            course
                        );

                    }
                );


            displayStudents(filtered);

        }
    );

}


// ============================================
// SORT
// ============================================

function setupSort() {

    const dropdowns =
        document.querySelectorAll(
            ".filter-dropdown"
        );


    if (dropdowns.length < 2) {

        return;

    }


    const sortDropdown =
        dropdowns[1];


    sortDropdown.innerHTML = `

        <option value="">
            Sort by Percentage
        </option>

        <option value="low">
            Low To High
        </option>

        <option value="high">
            High To Low
        </option>

    `;


    sortDropdown.addEventListener(
        "change",
        function() {

            const value =
                this.value;


            let sorted =
                [...students];


            if (value === "low") {

                sorted.sort(
                    function(a, b) {

                        return (
                            Number(
                                calculatePercentage(a)
                            )
                            -
                            Number(
                                calculatePercentage(b)
                            )
                        );

                    }
                );

            }


            if (value === "high") {

                sorted.sort(
                    function(a, b) {

                        return (
                            Number(
                                calculatePercentage(b)
                            )
                            -
                            Number(
                                calculatePercentage(a)
                            )
                        );

                    }
                );

            }


            displayStudents(sorted);

        }
    );

}


// ============================================
// ADD RESULT BUTTON
// ============================================

function setupAddButton() {

    const addButton =
        document.querySelector(
            ".table-actions .btn-primary"
        );


    if (!addButton) {

        return;

    }


    addButton.addEventListener(
        "click",
        function() {

            const form =
                document.getElementById(
                    "result-form"
                );


            if (form) {

                form.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                document
                    .getElementById(
                        "studentName"
                    )
                    .focus();

            }

        }
    );

}


// ============================================
// PAGE START
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Student Result Management System Loaded"
        );


        // Create complete form

        setupForm();


        // Setup form submit

        setupFormSubmit();


        // Search

        setupSearch();


        // Course filter

        setupCourseFilter();


        // Sort

        setupSort();


        // Add Result button

        setupAddButton();


        // Display students

        displayStudents();


        // Update dashboard

        updateDashboard();

    }
);