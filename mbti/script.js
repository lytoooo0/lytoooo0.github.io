document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let result = '';
    const answers = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
    };

    // Collect answers
    for (let i = 1; i <= 20; i++) {
        const question = document.querySelector(`input[name="q${i}"]:checked`);
        if (question) {
            answers[question.value]++;
        }
    }

    // Determine personality type
    const personalityType = 
        (answers.E > answers.I ? 'E' : 'I') +
        (answers.S > answers.N ? 'S' : 'N') +
        (answers.T > answers.F ? 'T' : 'F') +
        (answers.J > answers.P ? 'J' : 'P');

    // Display result
    result = `${personalityType}`;
    document.getElementById('result').innerText = result;
});
