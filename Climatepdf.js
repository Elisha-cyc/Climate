const { jsPDF } = window.jspdf;

document.getElementById('downloadGuide').addEventListener('click', generateClimateGuide);

function generateClimateGuide() {
    const doc = new jsPDF();
    
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('Climate Change Action Guide', 105, 50, { align: 'center' });
    doc.setFontSize(18);
    doc.text('Understanding the Crisis and Solutions', 105, 70, { align: 'center' });
    doc.setTextColor(255, 255, 255, 0.7);
    doc.setFontSize(14);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 105, 280, { align: 'center' });
    
    doc.addPage();
    doc.setTextColor(0, 0, 0);
    
    doc.setFontSize(22);
    doc.setTextColor(46, 204, 113);
    doc.text('Table of Contents', 20, 20);
    doc.setDrawColor(46, 204, 113);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 60, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('1. The Reality of Climate Change..........................3', 20, 40);
    doc.text('2. Major Effects Worldwide...............................4', 20, 50);
    doc.text('3. Proven Solutions........................................6', 20, 60);
    doc.text('4. Taking Action..........................................8', 20, 70);
    doc.text('5. Resources & Next Steps...........................10', 20, 80);
    
    doc.addPage();
    doc.setFontSize(22);
    doc.setTextColor(46, 204, 113);
    doc.text('1. The Reality of Climate Change', 20, 20);
    doc.setDrawColor(46, 204, 113);
    doc.line(20, 25, 90, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Climate change refers to significant, long-term changes in global temperature and weather patterns.', 20, 35);
    doc.text('Key facts:', 20, 45);
    
    const realityData = [
        ["Indicator", "Change", "Impact"],
        ["Global Temperature", "+1.1°C since 1880", "More heatwaves"],
        ["CO2 Levels", "419 ppm (2023)", "Highest in 2M years"],
        ["Arctic Ice", "-13% per decade", "Rising sea levels"],
        ["Extreme Weather", "+40% since 1980", "More disasters"]
    ];
    
    doc.autoTable({
        startY: 55,
        head: [realityData[0]],
        body: realityData.slice(1),
        theme: 'grid',
        headStyles: {
            fillColor: [52, 152, 219],
            textColor: [255, 255, 255]
        }
    });
    
    doc.addPage();
    doc.setFontSize(22);
    doc.setTextColor(231, 76, 60);
    doc.text('2. Major Effects Worldwide', 20, 20);
    doc.setDrawColor(231, 76, 60);
    doc.line(20, 25, 80, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const effects = [
        {
            title: "Rising Temperatures",
            content: "2023 was the hottest year on record, with devastating heatwaves affecting millions worldwide."
        },
        {
            title: "Extreme Weather",
            content: "Increased frequency and intensity of hurricanes, floods, droughts, and wildfires."
        },
        {
            title: "Sea Level Rise",
            content: "Oceans rising 3.7mm/year, threatening coastal communities and island nations."
        },
        {
            title: "Biodiversity Loss",
            content: "1 million species at risk of extinction due to habitat loss and climate impacts."
        }
    ];
    
    let y = 35;
    effects.forEach(effect => {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(231, 76, 60);
        doc.text(`• ${effect.title}`, 20, y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(effect.content, 25, y + 7);
        y += 20;
    });
    
    doc.addPage();
    doc.setFontSize(22);
    doc.setTextColor(52, 152, 219);
    doc.text('3. Proven Solutions', 20, 20);
    doc.setDrawColor(52, 152, 219);
    doc.line(20, 25, 70, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const solutions = [
        ["Solution", "Impact Potential", "Example"],
        ["Renewable Energy", "High", "Solar, wind replacing fossil fuels"],
        ["Energy Efficiency", "High", "LED lighting, efficient appliances"],
        ["Sustainable Transport", "Medium", "Electric vehicles, public transit"],
        ["Plant-Based Diet", "Medium", "Reducing meat consumption"],
        ["Reforestation", "High", "Restoring natural carbon sinks"]
    ];
    
    doc.autoTable({
        startY: 35,
        head: [solutions[0]],
        body: solutions.slice(1),
        theme: 'grid',
        headStyles: {
            fillColor: [46, 204, 113],
            textColor: [255, 255, 255]
        }
    });
    
    doc.addPage();
    doc.setFontSize(22);
    doc.setTextColor(155, 89, 182);
    doc.text('4. Taking Action', 20, 20);
    doc.setDrawColor(155, 89, 182);
    doc.line(20, 25, 60, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const actions = [
        {
            category: "Individual Actions",
            items: [
                "Reduce energy consumption at home",
                "Adopt a plant-rich diet",
                "Use sustainable transportation",
                "Reduce, reuse, recycle"
            ]
        },
        {
            category: "Community Actions",
            items: [
                "Join local environmental groups",
                "Support green businesses",
                "Participate in tree planting",
                "Organize awareness campaigns"
            ]
        },
        {
            category: "Political Actions",
            items: [
                "Vote for climate-conscious leaders",
                "Contact your representatives",
                "Support carbon pricing policies",
                "Advocate for renewable energy"
            ]
        }
    ];
    
    y = 35;
    actions.forEach(action => {
        doc.setFont(undefined, 'bold');
        doc.setTextColor(155, 89, 182);
        doc.text(action.category, 20, y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);
        
        action.items.forEach((item, i) => {
            doc.text(`- ${item}`, 25, y + 10 + (i * 7));
        });
        
        y += 10 + (action.items.length * 7) + 5;
    });
    
    doc.save('Climate_Change_Action_Guide.pdf');
    
    const btn = document.getElementById('downloadGuide');
    btn.innerHTML = '<i class="fas fa-check download-icon"></i> Download Complete!';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-file-pdf download-icon"></i> Download Full Guide (PDF)';
    }, 3000);
}

const backToHomeBtn = document.getElementById('backToHome');
function handleScroll() {
    if (window.scrollY > 200) {
        backToHomeBtn.classList.add('visible');
    } else {
        backToHomeBtn.classList.remove('visible');
    }
}

function handleClick() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
}

window.addEventListener('scroll', handleScroll);
backToHomeBtn.addEventListener('click', handleClick);

window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        backToHomeBtn.classList.remove('visible');
    }
});

