
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PredictionCard from "@/components/PredictionCard";
import AddPredictionModal from "@/components/AddPredictionModal";

export interface Prediction {
  id: string;
  summary: string;
  author: string;
  avatar: string;
  startDate: Date;
  predictionDate: Date;
  audioUrl?: string;
  videoUrl?: string;
}

const Index = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "1",
      summary: "Bitcoin will reach $100,000 by the end of this year",
      author: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face",
      startDate: new Date("2024-01-15"),
      predictionDate: new Date("2024-12-31"),
      audioUrl: "sample-audio.mp3"
    },
    {
      id: "2", 
      summary: "Remote work will become the standard for 80% of tech companies",
      author: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=face",
      startDate: new Date("2024-02-01"),
      predictionDate: new Date("2025-06-01"),
      videoUrl: "sample-video.mp4"
    },
    {
      id: "3",
      summary: "AI will help us discover a breakthrough in renewable energy storage",
      author: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
      startDate: new Date("2024-03-10"),
      predictionDate: new Date("2026-01-01")
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPrediction = (newPrediction: Omit<Prediction, "id">) => {
    const prediction: Prediction = {
      ...newPrediction,
      id: Date.now().toString()
    };
    setPredictions([prediction, ...predictions]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-blue-100">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔮 Predictions
          </h1>
          <p className="text-center text-blue-600/70 mt-2 text-sm">
            Track your future thoughts and ideas
          </p>
        </div>
      </div>

      {/* Predictions Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {predictions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">No predictions yet</h3>
            <p className="text-blue-600/70 mb-6">Start tracking your future thoughts and ideas!</p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Make Your First Prediction
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div 
                key={prediction.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PredictionCard prediction={prediction} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Add Prediction Modal */}
      <AddPredictionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPrediction}
      />
    </div>
  );
};

export default Index;
