export default function handler(req, res) {

    const correctAnswers = [
        "42","80","216","13","243","-8","O","EV",
        "-3","32","Sebagian A mungkin C","Makan",
        "Kucing bernapas","7.5","Mawar indah"
    ];

    const {answers, timeTaken} = req.body;

    let correct = 0;

    answers.forEach((ans, i) => {
        if(ans.toLowerCase() === correctAnswers[i].toLowerCase()){
            correct++;
        }
    });

    let accuracy = correct / 15;
    let speedFactor = Math.max(0.5, 1 - (timeTaken / 900));

    let iq = Math.round((accuracy * 100) + (speedFactor * 50));
    if(iq > 150) iq = 150;

    let level =
        iq >= 130 ? "Sangat Superior" :
        iq >= 115 ? "Di Atas Rata-rata" :
        iq >= 100 ? "Rata-rata" :
        iq >= 85 ? "Di Bawah Rata-rata" :
        "Perlu Pengembangan";

    res.status(200).json({
        correct,
        time: timeTaken.toFixed(2),
        iq,
        level
    });
}
