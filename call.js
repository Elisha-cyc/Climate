
document.addEventListener('DOMContentLoaded', function() {
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(counter);
            element.textContent = Math.floor(target).toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = parseInt(target.getAttribute('data-target'));
            animateCounter(target, finalNumber);
            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.getElementById('trees-planted').setAttribute('data-target', '12700');
document.getElementById('volunteers').setAttribute('data-target', '8742');
document.getElementById('petitions').setAttribute('data-target', '3215');
document.getElementById('carbon-reduced').setAttribute('data-target', '1048');

document.querySelectorAll('.counter-number').forEach(counter => {
    observer.observe(counter);
});

const volunteerBtn = document.getElementById('volunteer-btn');
const donateBtn = document.getElementById('donate-btn');
const advocateBtn = document.getElementById('advocate-btn');
const volunteerModal = document.getElementById('volunteer-modal');
const donateModal = document.getElementById('donate-modal');
const advocateModal = document.getElementById('advocate-modal');
const closeButtons = document.querySelectorAll('.close-modal');

volunteerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    volunteerModal.style.display = 'flex';
});

donateBtn.addEventListener('click', function(e) {
    e.preventDefault();
    donateModal.style.display = 'flex';
});

advocateBtn.addEventListener('click', function(e) {
    e.preventDefault();
    advocateModal.style.display = 'flex';
});

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
    this.reset();
});

document.getElementById('volunteer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your volunteer application! We will contact you soon with opportunities.');
    this.reset();
    volunteerModal.style.display = 'none';
});

document.getElementById('donate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('donation-amount').value;
    alert(`Thank you for your donation of $${amount}! Your support helps fight climate change.`);
    this.reset();
    donateModal.style.display = 'none';
});

document.getElementById('advocate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Your message has been sent to your representatives. Thank you for speaking up for climate action!');
    this.reset();
    advocateModal.style.display = 'none';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
});

document.addEventListener('DOMContentLoaded', function() {
const donationPopup = document.getElementById('donationPopup');
const closeDonation = document.getElementById('closeDonation');
const donationAmounts = document.querySelectorAll('.donation-amount');
const customAmount = document.querySelector('.custom-amount');
const donationSubmit = document.getElementById('donationSubmit');
const paymentHistoryBody = document.getElementById('payment-history-body');
const totalDonatedElement = document.getElementById('total-donated');
const donationProgress = document.getElementById('donation-progress');

let selectedAmount = 0;
let payments = JSON.parse(localStorage.getItem('climatePayments')) || [];
let popupShown = localStorage.getItem('popupShown') === 'true';
let popupTimer;

if (!popupShown) {
    popupTimer = setTimeout(() => {
        donationPopup.style.display = 'block';
        localStorage.setItem('popupShown', 'true');
    }, 600); 
}

closeDonation.addEventListener('click', function() {
    donationPopup.style.display = 'none';
});

donationAmounts.forEach(amount => {
    amount.addEventListener('click', function() {
        donationAmounts.forEach(a => a.classList.remove('selected'));
        this.classList.add('selected');
        selectedAmount = parseInt(this.dataset.amount);
        customAmount.value = '';
    });
});

customAmount.addEventListener('input', function() {
    if (this.value) {
        donationAmounts.forEach(a => a.classList.remove('selected'));
        selectedAmount = parseInt(this.value) || 0;
    }
});

donationSubmit.addEventListener('click', function() {
    if (selectedAmount <= 0) {
        alert('Please select or enter a donation amount');
        return;
    }

    const payment = {
        date: new Date().toLocaleDateString(),
        amount: selectedAmount,
        type: 'One-time',
        status: 'Completed'
    };

    payments.push(payment);
    
    localStorage.setItem('climatePayments', JSON.stringify(payments));
    
    updatePaymentHistory();
    
    donationPopup.style.display = 'none';
    
    alert(`Thank you for your donation of $${selectedAmount}! Your support helps fight climate change.`);
    
    donationAmounts.forEach(a => a.classList.remove('selected'));
    customAmount.value = '';
    selectedAmount = 0;
});

function updatePaymentHistory() {
    const totalDonated = payments.reduce((sum, payment) => sum + payment.amount, 0);
    totalDonatedElement.textContent = totalDonated;
    
    const progressPercent = Math.min((totalDonated / 500) * 100, 100);
    donationProgress.style.width = `${progressPercent}%`;
    
    if (payments.length > 0) {
        paymentHistoryBody.innerHTML = '';
        
        payments.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.date}</td>
                <td>$${payment.amount}</td>
                <td>${payment.type}</td>
                <td>${payment.status}</td>
            `;
            paymentHistoryBody.appendChild(row);
        });
    }
}

updatePaymentHistory();

});



document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});


document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
    document.body.innerHTML = '<div style="padding:20px;text-align:center;font-family:Arial;"><h1>Inspection Not Allowed</h1><p>This page is protected against unauthorized inspection.</p></div>';
    document.body.style = 'background:#fff;color:#333;margin:0;padding:0;';
  }
});

setInterval(() => {
  const start = Date.now();
  debugger;
  if (Date.now() - start > 100) {
    window.location.href = 'about:blank';
  }
}, 1000);
