document.getElementById('ageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    if (!isValidDate(day, month, year)) {
        alert('Please enter a valid date.');
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
        alert('The date cannot be in the future.');
        return;
    }

    const age = calculateAge(birthDate, today);
    animateCount('years', age.years);
    animateCount('months', age.months);
    animateCount('days', age.days);
});

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function calculateAge(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function animateCount(id, endValue) {
    const element = document.getElementById(id);
    let startValue = 0;
    const duration = 1000;
    const increment = endValue / (duration / 16.67);

    function update() {
        startValue += increment;
        if (startValue > endValue) startValue = endValue;
        element.textContent = Math.floor(startValue);
        if (startValue < endValue) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}
