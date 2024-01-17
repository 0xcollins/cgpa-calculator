function addCourseRow() {
    const tableBody = document
      .getElementById("courseTable")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow(tableBody.rows.length);

    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell(i);
      const input = document.createElement("input");

      if (i === 0) {
        input.type = "text";
        input.placeholder = "Course " + (tableBody.rows.length + 1);
      } else if (i === 3) {
        input.type = "text";
        input.placeholder = "Automatically Calculated";
        input.readOnly = true;
      } else {
        input.type = "number";
        input.placeholder = i === 2 ? "Score" : "Enter value";
        if (i === 2) {
          input.setAttribute("oninput", "updateGradePoint(this)");
        }
      }

      cell.appendChild(input);
    }
  }

  function calculateGradePoint(score) {
    if (score >= 70) {
      return 5;
    } else if (score >= 60) {
      return 4;
    } else if (score >= 50) {
      return 3;
    } else if (score >= 45) {
      return 2;
    } else {
      return 0;
    }
  }

  function updateGradePoint(input) {
    const row = input.parentNode.parentNode;
    const score = parseFloat(input.value) || 0;
    const gradePointInput = row.cells[3].getElementsByTagName("input")[0];
    const gradePoint = calculateGradePoint(score);
    gradePointInput.value = gradePoint;
  }

  function calculateGPA() {
    const table = document.getElementById("courseTable");
    const rows = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");
    let totalCreditUnit = 0;
    let totalWeightedScore = 0;

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const creditUnit =
        parseFloat(cells[1].getElementsByTagName("input")[0].value) || 0;
      const score =
        parseFloat(cells[2].getElementsByTagName("input")[0].value) || 0;

      const gradePoint = calculateGradePoint(score);

      const weightedScore = creditUnit * gradePoint;
      totalWeightedScore += weightedScore;
      totalCreditUnit += creditUnit;

      // Update the Grade Point field in the table
      cells[3].getElementsByTagName("input")[0].value = gradePoint;
    }

    const gpa =
      totalCreditUnit !== 0 ? totalWeightedScore / totalCreditUnit : 0;

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "GPA: " + gpa.toFixed(2);

    // Display Degree Rank
    displayDegreeRank(gpa);
  }

  function displayDegreeRank(gpa) {
    const degreeRankDiv = document.getElementById("degreeRank");

    if (gpa >= 4.5 && gpa <= 5.0) {
      degreeRankDiv.innerText = "Degree Rank: First Class Degree";
    } else if (gpa >= 3.59 && gpa <= 4.49) {
      degreeRankDiv.innerText = "Degree Rank: Second Class Upper";
    } else if (gpa >= 2.4 && gpa <= 3.49) {
      degreeRankDiv.innerText = "Degree Rank: Second Class Lower";
    } else if (gpa >= 1.5 && gpa <= 2.39) {
      degreeRankDiv.innerText = "Degree Rank: Third Class";
    } else if (gpa >= 1.0 && gpa <= 1.49) {
      degreeRankDiv.innerText = "Degree Rank: Pass Degree";
    } else {
      degreeRankDiv.innerText = "Degree Rank: Not Specified";
    }
  }