const addMedications = document.querySelector(".add-medication");
const medicationList = document.querySelector(".medication");
const medication = JSON.parse(localStorage.getItem("medication")) || [];

function addMedication(e) {
  e.preventDefault();
  const text = this.querySelector("[name=Medication]").value;
  const totalCounts = +this.querySelector("[name=dose]").value;
  const timeframe = this.querySelector("[name=timeframe]").value;
  const medications = {
    text: text,
    dose: totalCounts,
    totalCounts: totalCounts,
    timeframe: timeframe,
    completed: false,
  };

  medication.push(medications);
  listMedication(medication, medicationList);
  localStorage.setItem("medication", JSON.stringify(medication));
  this.reset();
  console.log(medications);
}

function listMedication(medication = [], medicationList) {
  medicationList.innerHTML = medication
    .map((medication, i) => {
      return `
            <li>
            <input type="checkbox" data-index=${i} id="medication${i}" ${
        medication.completed ? "checked" : ""
      } />
            <label for="medication${i}"><span>${medication.dose}/${medication.totalCounts} ${
        medication.timeframe
      }</span> ${medication.text}</label>
        <button class="delete" data-index=${i} id="delete${i}">Delete</button>
        </li>
        `;
    })
    .join("");
}

// Toggle If Complete
function toggleCompleted(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  medication[index].dose += 1;

  if (medication[index].dose === medication[index].totalCounts) {
    medication[index].completed = true;
  } else if (medication[index].dose > medication[index].totalCounts) {
    medication[index].dose = 0;
    medication[index].completed = false;
  }

  listMedication(medication, medicationList);
  localStorage.setItem("medication", JSON.stringify(medication));
}

// Delete Medication
function deleteMedication(e) {
  if (!e.target.matches("button")) return;
  const el = e.target;
  const index = el.dataset.index;

  medication.splice(index, 1);

  listMedication(medication, medicationList);
  localStorage.setItem("medication", JSON.stringify(medication));
}

addMedications.addEventListener("submit", addMedication);
medicationList.addEventListener("click", toggleCompleted);
medicationList.addEventListener("click", deleteMedication);

listMedication(medication, medicationList);