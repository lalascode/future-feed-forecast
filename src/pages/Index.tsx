
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
  likes: number;
  isLiked: boolean;
  parentId?: string; // For challenge threads
  challenges?: Prediction[]; // Child predictions
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
      audioUrl: "sample-audio.mp3",
      likes: 12,
      isLiked: false,
      challenges: []
    },
    {
      id: "2", 
      summary: "Remote work will become the standard for 80% of tech companies",
      author: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=face",
      startDate: new Date("2024-02-01"),
      predictionDate: new Date("2025-06-01"),
      videoUrl: "sample-video.mp4",
      likes: 8,
      isLiked: true,
      challenges: []
    },
    {
      id: "3",
      summary: "AI will help us discover a breakthrough in renewable energy storage",
      author: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
      startDate: new Date("2024-03-10"),
      predictionDate: new Date("2026-01-01"),
      likes: 24,
      isLiked: false,
      challenges: []
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challengingPredictionId, setChallengingPredictionId] = useState<string | null>(null);

  const addPrediction = (newPrediction: Omit<Prediction, "id" | "likes" | "isLiked" | "challenges">) => {
    const prediction: Prediction = {
      ...newPrediction,
      id: Date.now().toString(),
      likes: 0,
      isLiked: false,
      challenges: []
    };

    if (challengingPredictionId) {
      // Add as a challenge to existing prediction
      setPredictions(predictions.map(p => {
        if (p.id === challengingPredictionId) {
          return {
            ...p,
            challenges: [...(p.challenges || []), { ...prediction, parentId: challengingPredictionId }]
          };
        }
        return p;
      }));
      setChallengingPredictionId(null);
    } else {
      // Add as new main prediction
      setPredictions([prediction, ...predictions]);
    }
  };

  const handleLike = (predictionId: string, isChallenge = false, parentId?: string) => {
    if (isChallenge && parentId) {
      // Handle challenge like
      setPredictions(predictions.map(prediction => {
        if (prediction.id === parentId) {
          return {
            ...prediction,
            challenges: prediction.challenges?.map(challenge => {
              if (challenge.id === predictionId) {
                return {
                  ...challenge,
                  likes: challenge.isLiked ? challenge.likes - 1 : challenge.likes + 1,
                  isLiked: !challenge.isLiked
                };
              }
              return challenge;
            })
          };
        }
        return prediction;
      }));
    } else {
      // Handle main prediction like
      setPredictions(predictions.map(prediction => {
        if (prediction.id === predictionId) {
          return {
            ...prediction,
            likes: prediction.isLiked ? prediction.likes - 1 : prediction.likes + 1,
            isLiked: !prediction.isLiked
          };
        }
        return prediction;
      }));
    }
  };

  const handleChallenge = (predictionId: string) => {
    setChallengingPredictionId(predictionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChallengingPredictionId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 safe-area-inset">
      {/* Mobile-optimized Header */}
      <div className="bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-blue-100 shadow-sm">
        <div className="max-w-sm mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔮 Predictions
          </h1>
          <p className="text-center text-blue-600/70 mt-1 text-xs sm:text-sm">
            Track your future thoughts and ideas
          </p>
        </div>
      </div>

      {/* Mobile-optimized Predictions Feed */}
      <div className="max-w-sm mx-auto px-3 py-4 pb-20 sm:pb-24">
        {predictions.length === 0 ? (
          <div className="text-center py-8 px-4">
            <div className="text-5xl mb-4">🔮</div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">No predictions yet</h3>
            <p className="text-blue-600/70 mb-6 text-sm">Start tracking your future thoughts and ideas!</p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
            >
              Make Your First Prediction
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div 
                key={prediction.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PredictionCard 
                  prediction={prediction} 
                  onLike={() => handleLike(prediction.id)}
                  onChallenge={() => handleChallenge(prediction.id)}
                />
                
                {/* Challenge/Thread Display */}
                {prediction.challenges && prediction.challenges.length > 0 && (
                  <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-200 pl-3">
                    {prediction.challenges.map((challenge, challengeIndex) => (
                      <div
                        key={challenge.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${(index * 0.1) + (challengeIndex * 0.05)}s` }}
                      >
                        <PredictionCard
                          prediction={challenge}
                          onLike={() => handleLike(challenge.id, true, prediction.id)}
                          onChallenge={() => handleChallenge(prediction.id)}
                          isChallenge={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile-optimized Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      <AddPredictionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={addPrediction}
        isChallenge={!!challengingPredictionId}
      />
    </div>
  );
};

export default Index;
