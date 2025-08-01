import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

const SizeChart = () => {
  const sizeData = [
    { size: 'S', chest: '36-38', length: '27', sleeve: '24' },
    { size: 'M', chest: '40-42', length: '28', sleeve: '25' },
    { size: 'L', chest: '44-46', length: '29', sleeve: '26' },
    { size: 'XL', chest: '48-50', length: '30', sleeve: '27' },
    { size: 'XXL', chest: '52-54', length: '31', sleeve: '28' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors">
          <Ruler className="h-4 w-4" />
          <span>Size Guide</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            All measurements are in inches. For the best fit, measure your body and compare with the size chart below.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium">Size</th>
                  <th className="text-left py-2 font-medium">Chest</th>
                  <th className="text-left py-2 font-medium">Length</th>
                  <th className="text-left py-2 font-medium">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.size} className="border-b border-border/50">
                    <td className="py-2 font-medium">{row.size}</td>
                    <td className="py-2 text-muted-foreground">{row.chest}</td>
                    <td className="py-2 text-muted-foreground">{row.length}</td>
                    <td className="py-2 text-muted-foreground">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-muted p-3 rounded text-xs space-y-2">
            <h4 className="font-medium">How to Measure:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem</li>
              <li><strong>Sleeve:</strong> Measure from the center back neck to the wrist</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChart;