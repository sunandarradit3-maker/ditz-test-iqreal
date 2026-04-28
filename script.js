const questions = [
{q:"2, 6, 12, 20, 30, ?", a:"42"},
{q:"5, 10, 20, 40, ?", a:"80"},
{q:"8, 27, 64, 125, ?", a:"216"},
{q:"1, 1, 2, 3, 5, 8, ?", a:"13"},
{q:"3, 9, 27, 81, ?", a:"243"},
{q:"10, 7, 3, -2, ?", a:"-8"},
{q:"A, C, F, J, ?", a:"O"},
{q:"AZ, BY, CX, DW, ?", a:"EV"},
{q:"Jika 3x + 9 = 0, x =", a:"-3"},
{q:"2^5 =", a:"32"},
{q:"Semua A adalah B, sebagian B adalah C:", a:"Sebagian A mungkin C"},
{q:"Air : Minum = Makanan :", a:"Makan"},
{q:"Semua kucing adalah hewan:", a:"Kucing bernapas"},
{q:"Jam 3:15 sudut =", a:"7.5"},
{q:"Semua bunga indah, mawar bunga:", a:"Mawar indah"}
];

let startTime = Date.now();

function loadQuiz() {
    const quiz = document.getElementById("quiz");
    questions.forEach((item, i) => {
        quiz.innerHTML += `
        <div class="question">
            <p>${i+1}. ${item.q}</p>
            <input id="q${i}">
        </div>`;
    });
}

async function submitTest() {
    let answers = [];

    questions.forEach((item, i) => {
        let val = document.getElementById("q"+i).value.trim();
        answers.push(val);
    });

    let timeTaken = (Date.now() - startTime)/1000;

    const res = await fetch("/api/score", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({answers, timeTaken})
    });

    const data = await res.json();

    document.getElementById("result").innerHTML = `
    <div class="result">
    <h2>Laporan Profesional</h2>
    <p>Jawaban Benar: ${data.correct}/15</p>
    <p>Waktu: ${data.time}s</p>
    <p>IQ: ${data.iq}</p>
    <p>${data.level}</p>
    </div>`;
}

loadQuiz();
