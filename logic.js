const START_DATE = new Date("2026-01-14");
const TODAY = new Date();
const PERIOD_OF_INTAKE_DAYS = 31;

const medicines = [
  { name: "Еманера", times: ["08:00", "-", "-"], desc: "1х1 / 30 min преди храна" },
  { name: "Дуспаталин", times: ["07:30", "-", "20:00"], desc: "2х1 / преди храна" },
  { name: "Креон", times: ["07:30", "13:00", "20:00"], desc: "3х1 / по време на храна" },
  { name: "Хулудексан", times: ["8:00", "13:30", "20:30"], desc: "3х1 / след храна" },
  { name: "Бутирин", times: ["-", "-", "20:30"], desc: "1х1 / след храна" }
];

window.addEventListener("load", () => {
  const $main = document.querySelector("main");
  const days = getDaysForOneMonth(START_DATE);
  const tables = [];

  days.forEach((day) => {
    const isInThePast = day.getDate() < TODAY.getDate() && day.getMonth() === TODAY.getMonth();
    let table = [`<div class='table ${isInThePast ? "past" : ""}'>`];
    table.push(
      `<div class='date'>${day.getDate().toString().padStart(2, "0")}.${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}</div>`
    );
    table.push("<div class='medicines'>");
    medicines.forEach((medicine) => {
      table.push("<div class='medicine'>");
      table.push(`<div class="medicine-name">
        ${medicine.name}<br />
        <span class="medicine-desc">${medicine.desc}</span>
      </div>`);
      medicine.times.forEach((time) => {
        const key = `${medicine.name}_${day.toISOString()}_${time}`;
        const isTaken = localStorage.getItem(key) === "taken";
        table.push(
          `<div class='time-slot ${isTaken ? "taken" : ""}' onclick="onTimeSlotClick(this, '${key}')">${time}</div>`
        );
      });
      table.push("</div>");
    });
    table.push("</div>");
    table.push("</div>");
    tables.push(table.join(""));
  });
  $main.innerHTML = tables.join("");
});
function onTimeSlotClick(element, key) {
  const data = localStorage.getItem(key);
  if (!data || data !== "taken") {
    element.classList.add("taken");
    localStorage.setItem(key, "taken");
  } else {
    localStorage.setItem(key, "nah");
    element.classList.remove("taken");
  }
}
function getDaysForOneMonth(startDate) {
  const date = new Date(startDate);
  const days = [];
  let i = 0;
  while (i++ < PERIOD_OF_INTAKE_DAYS) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
