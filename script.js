class AgeCalculator {
    constructor() {
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        const birthdateInput = document.getElementById('birthdate');
        
        calculateBtn.addEventListener('click', () => this.calculateAge());
        birthdateInput.addEventListener('change', () => this.calculateAge());
        
        // Set max date to today
        const today = new Date().toISOString().split('T')[0];
        birthdateInput.setAttribute('max', today);
    }
    
    calculateAge() {
        const birthdateInput = document.getElementById('birthdate');
        const birthdate = new Date(birthdateInput.value);
        
        if (!birthdateInput.value) {
            this.hideResults();
            return;
        }
        
        if (birthdate > new Date()) {
            alert('Birth date cannot be in the future!');
            this.hideResults();
            return;
        }
        
        const today = new Date();
        const ageData = this.calculateExactAge(birthdate, today);
        
        this.displayResults(ageData);
    }
    
    calculateExactAge(birthdate, today) {
        let years = today.getFullYear() - birthdate.getFullYear();
        let months = today.getMonth() - birthdate.getMonth();
        let days = today.getDate() - birthdate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate total days lived
        const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
        
        // Calculate total hours and minutes
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        
        // Calculate days until next birthday
        let nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        
        return {
            years,
            months,
            days,
            totalDays,
            totalHours,
            totalMinutes,
            daysToNextBirthday
        };
    }
    
    displayResults(ageData) {
        // Update age display
        document.getElementById('years').textContent = ageData.years;
        document.getElementById('months').textContent = ageData.months;
        document.getElementById('days').textContent = ageData.days;
        
        // Update fun facts
        document.getElementById('totalDays').textContent = ageData.totalDays.toLocaleString();
        document.getElementById('totalHours').textContent = ageData.totalHours.toLocaleString();
        document.getElementById('totalMinutes').textContent = ageData.totalMinutes.toLocaleString();
        document.getElementById('nextBirthday').textContent = ageData.daysToNextBirthday;
        
        // Show results with animation
        const resultsDiv = document.getElementById('results');
        resultsDiv.style.display = 'block';
        resultsDiv.classList.add('fade-in');
    }
    
    hideResults() {
        const resultsDiv = document.getElementById('results');
        resultsDiv.style.display = 'none';
        resultsDiv.classList.remove('fade-in');
    }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});

