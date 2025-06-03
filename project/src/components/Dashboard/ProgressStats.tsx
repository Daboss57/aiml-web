import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { Progress } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressStatsProps {
  progress: Progress[];
  totalLessons: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ progress, totalLessons }) => {
  const completedLessons = progress.filter(p => p.completed).length;
  const completionPercentage = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;
  
  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedLessons, totalLessons - completedLessons],
        backgroundColor: ['#2CA58D', '#E5E7EB'],
        borderColor: ['#2CA58D', '#E5E7EB'],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Your Progress</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="h-48 w-48 relative">
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-primary-600">{completionPercentage}%</span>
              <span className="text-sm text-gray-500">Complete</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold text-gray-900">{completedLessons}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-xl font-semibold text-gray-900">{totalLessons - completedLessons}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStats;