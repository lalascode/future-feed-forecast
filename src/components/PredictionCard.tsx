
import { format } from "date-fns";
import { Calendar, User, FileAudio, FileVideo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prediction } from "@/pages/Index";

interface PredictionCardProps {
  prediction: Prediction;
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  const daysUntilPrediction = Math.ceil(
    (prediction.predictionDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isPastDue = daysUntilPrediction < 0;
  const isComingSoon = daysUntilPrediction <= 30 && daysUntilPrediction >= 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
      <CardContent className="p-6">
        {/* Header with Avatar and Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src={prediction.avatar}
              alt={prediction.author}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-blue-900">{prediction.author}</p>
            <p className="text-sm text-blue-600/70">
              {format(prediction.startDate, "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            {prediction.audioUrl && (
              <div className="p-2 bg-orange-100 rounded-full">
                <FileAudio className="w-4 h-4 text-orange-600" />
              </div>
            )}
            {prediction.videoUrl && (
              <div className="p-2 bg-purple-100 rounded-full">
                <FileVideo className="w-4 h-4 text-purple-600" />
              </div>
            )}
          </div>
        </div>

        {/* Prediction Text */}
        <p className="text-blue-900 mb-4 leading-relaxed font-medium">
          {prediction.summary}
        </p>

        {/* Footer with Prediction Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600/70">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Predicted for {format(prediction.predictionDate, "MMM d, yyyy")}
            </span>
          </div>
          
          <Badge 
            variant={isPastDue ? "destructive" : isComingSoon ? "default" : "secondary"}
            className={`
              ${isPastDue ? "bg-red-100 text-red-700 hover:bg-red-100" : ""}
              ${isComingSoon ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" : ""}
              ${!isPastDue && !isComingSoon ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : ""}
            `}
          >
            {isPastDue 
              ? `${Math.abs(daysUntilPrediction)} days ago`
              : daysUntilPrediction === 0
                ? "Today!"
                : `${daysUntilPrediction} days left`
            }
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
