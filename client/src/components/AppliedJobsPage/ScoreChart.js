import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadarController, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ScoreChart = ({ data }) => {
    const chartData = {
        labels: ['Project', 'Experience', 'Education'],
        datasets: [
            {
                label: 'Score',
                data: [data.projectScore, data.experienceScore, data.educationScore],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
                pointBorderColor: '#fff',
                pointRadius: 5
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#333', // Color of the legend text
                },
            },
            tooltip: {
                enabled: false, // Disable the default tooltip
                external: function(context) {
                    const tooltipEl = document.getElementById('chartjs-tooltip');
                    
                    if (!tooltipEl) {
                        const tooltip = document.createElement('div');
                        tooltip.id = 'chartjs-tooltip';
                        tooltip.innerHTML = '<div></div>';
                        document.body.appendChild(tooltip);
                    }

                    const tooltip = document.getElementById('chartjs-tooltip');
                    const tooltipModel = context.tooltip;

                    if (tooltipModel.opacity === 0) {
                        tooltip.style.opacity = '0';
                        return;
                    }

                    const title = tooltipModel.title || [];
                    const body = tooltipModel.body.map(b => b.lines).flat();
                    
                    let label = title[0];
                    let value = body[0] || '';
                    
                    let suggestion = '';
                    switch (label) {
                        case 'Project':
                            suggestion = data.projectsSuggestions;
                            break;
                        case 'Experience':
                            suggestion = data.experienceSuggestions;
                            break;
                        case 'Education':
                            suggestion = data.educationSuggestions;
                            break;
                        default:
                            suggestion = 'No suggestion available';
                    }

                    let innerHtml = `<div><strong>${label} ${value}</strong></div>`;
                    innerHtml += `<div><strong>Suggestion: </strong> ${suggestion}</div>`;

                    tooltip.innerHTML = innerHtml;

                    const position = context.chart.canvas.getBoundingClientRect();
                    
                    tooltip.style.opacity = '1';
                    tooltip.style.position = 'absolute';
                    tooltip.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX}px`;
                    tooltip.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY}px`;
                    tooltip.style.padding = '10px';
                    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    tooltip.style.color = '#fff';
                    tooltip.style.borderRadius = '3px';
                    tooltip.style.maxWidth = '400px'; // Set a maximum width
                    tooltip.style.wordWrap = 'break-word'; // Enable word wrapping
                    tooltip.style.pointerEvents = 'none'; // Prevent tooltip from blocking interactions
                },
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                grid: {
                    circular: true,
                },
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        return value; // Display value at each tick mark
                    }
                },
            },
        },
    };

    return <Radar data={chartData} options={options} />;
};

export default ScoreChart;
