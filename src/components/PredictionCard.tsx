
import { format } from "date-fns";
import { Calendar, User, FileAudio, FileVideo, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prediction } from "@/pages/Index";

interface PredictionCardProps {
  prediction: Prediction;
  onLike: () => void;
}

const PredictionCard = ({ prediction, onLike }: PredictionCardProps) => {
  const daysUntilPrediction = Math.ceil(
    (prediction.predictionDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isPastDue = daysUntilPrediction < 0;
  const isComingSoon = daysUntilPrediction <= 30 && daysUntilPrediction >= 0;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group active:scale-[0.98] mx-1">
      <CardContent className="p-4 sm:p-6">
        {/* Header with Avatar and Author - Mobile optimized */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <img
              src={prediction.avatar}
              alt={prediction.author}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all duration-300"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-blue-900 text-sm sm:text-base truncate">{prediction.author}</p>
            <p className="text-xs sm:text-sm text-blue-600/70">
              {format(prediction.startDate, "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
            {prediction.audioUrl && (
              <div className="p-1.5 sm:p-2 bg-orange-100 rounded-full">
                <FileAudio className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              </div>
            )}
            {prediction.videoUrl && (
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded-full">
                <FileVideo className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </div>
            )}
          </div>
        </div>

        {/* Prediction Text - Mobile optimized */}
        <p className="text-blue-900 mb-4 leading-relaxed font-medium text-sm sm:text-base">
          {prediction.summary}
        </p>

        {/* Footer with Prediction Date and Like Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-blue-600/70 min-w-0 flex-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">
              {format(prediction.predictionDate, "MMM d, yyyy")}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              variant="ghost"
              size="sm"
              className={`
                p-2 h-auto min-w-0 rounded-full transition-all duration-200 hover:scale-110 active:scale-95
                ${prediction.isLiked 
                  ? "text-red-500 hover:text-red-600 hover:bg-red-50" 
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                }
              `}
            >
              <Heart 
                className={`w-4 h-4 ${prediction.isLiked ? "fill-current" : ""}`} 
              />
            </Button>
            
            {prediction.likes > 0 && (
              <span className="text-xs text-gray-500 font-medium">
                {prediction.likes}
              </span>
            )}
            
            <Badge 
              variant={isPastDue ? "destructive" : isComingSoon ? "default" : "secondary"}
              className={`
                text-xs px-2 py-1 whitespace-nowrap
                ${isPastDue ? "bg-red-100 text-red-700 hover:bg-red-100" : ""}
                ${isComingSoon ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : ""}
                ${!isPastDue && !isComingSoon ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : ""}
              `}
            >
              {isPastDue 
                ? `${Math.abs(daysUntilPrediction)}d ago`
                : daysUntilPrediction === 0
                  ? "Today!"
                  : `${daysUntilPrediction}d left`
              }
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
