
import { useState } from "react";
import { format } from "date-fns";
import { Calendar, CalendarIcon, FileAudio, FileVideo, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Prediction } from "@/pages/Index";

interface AddPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (prediction: Omit<Prediction, "id">) => void;
}

const AddPredictionModal = ({ isOpen, onClose, onAdd }: AddPredictionModalProps) => {
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [avatar, setAvatar] = useState("");
  const [predictionDate, setPredictionDate] = useState<Date>();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!summary || !author || !predictionDate) {
      return;
    }

    const newPrediction: Omit<Prediction, "id"> = {
      summary,
      author,
      avatar: avatar || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face",
      startDate: new Date(),
      predictionDate,
      audioUrl: audioFile ? URL.createObjectURL(audioFile) : undefined,
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : undefined,
      likes: 0,
      isLiked: false
    };

    onAdd(newPrediction);
    
    // Reset form
    setSummary("");
    setAuthor("");
    setAvatar("");
    setPredictionDate(undefined);
    setAudioFile(null);
    setVideoFile(null);
    onClose();
  };

  const handleClose = () => {
    setSummary("");
    setAuthor("");
    setAvatar("");
    setPredictionDate(undefined);
    setAudioFile(null);
    setVideoFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔮 New Prediction
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-blue-900 font-medium">
              What do you predict?
            </Label>
            <Textarea
              id="summary"
              placeholder="Share your prediction about the future..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200 resize-none"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-blue-900 font-medium">
              Your Name
            </Label>
            <Input
              id="author"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-blue-900 font-medium">
              Avatar URL (optional)
            </Label>
            <Input
              id="avatar"
              placeholder="https://example.com/avatar.jpg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-blue-900 font-medium">When will this come true?</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-blue-200 hover:border-blue-300",
                    !predictionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {predictionDate ? format(predictionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={predictionDate}
                  onSelect={setPredictionDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Media Attachments */}
          <div className="space-y-3">
            <Label className="text-blue-900 font-medium">Add Media (optional)</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="audio" className="flex items-center gap-2 cursor-pointer p-3 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
                  <FileAudio className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-blue-700">Audio</span>
                </Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                {audioFile && (
                  <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    <FileAudio className="w-3 h-3" />
                    <span className="truncate">{audioFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAudioFile(null)}
                      className="text-orange-700 hover:text-orange-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer p-3 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
                  <FileVideo className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-blue-700">Video</span>
                </Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                {videoFile && (
                  <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 p-2 rounded">
                    <FileVideo className="w-3 h-3" />
                    <span className="truncate">{videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="text-purple-700 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Prediction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPredictionModal;
