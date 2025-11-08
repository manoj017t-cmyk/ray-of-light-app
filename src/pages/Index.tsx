import { useState, useEffect } from "react";
import { Heart, Sparkles, Smile, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const compliments = [
  "You're absolutely radiant today! ✨",
  "Your smile could light up the whole world! 🌟",
  "You're doing an amazing job! Keep it up! 💪",
  "The world is better with you in it! 🌈",
  "You're incredibly thoughtful and kind! 💝",
  "Your creativity knows no bounds! 🎨",
  "You make everyone around you happier! 😊",
  "You're stronger than you think! 🦋",
  "Your positive energy is contagious! ⚡",
  "You deserve all the happiness in the world! 🌸",
];

const Index = () => {
  const [currentCompliment, setCurrentCompliment] = useState("");
  const [gratitudeNotes, setGratitudeNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showCompliment, setShowCompliment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("gratitudeNotes");
    if (saved) {
      setGratitudeNotes(JSON.parse(saved));
    }
  }, []);

  const generateCompliment = () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(randomCompliment);
    setShowCompliment(true);
    setTimeout(() => setShowCompliment(false), 3000);
  };

  const addGratitudeNote = () => {
    if (newNote.trim()) {
      const updated = [...gratitudeNotes, newNote.trim()];
      setGratitudeNotes(updated);
      localStorage.setItem("gratitudeNotes", JSON.stringify(updated));
      setNewNote("");
      toast({
        title: "Added! 💖",
        description: "Your gratitude has been saved",
      });
    }
  };

  const deleteNote = (index: number) => {
    const updated = gratitudeNotes.filter((_, i) => i !== index);
    setGratitudeNotes(updated);
    localStorage.setItem("gratitudeNotes", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 pt-8 animate-slide-up">
          <div className="inline-block animate-float">
            <Sun className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Daily Sunshine
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your daily dose of positivity and gratitude ☀️
          </p>
        </header>

        {/* Compliment Generator */}
        <Card className="card-glass p-6 md:p-8 space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-soft" />
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Need a Pick-Me-Up?
              </h2>
              <Sparkles className="w-6 h-6 text-secondary animate-pulse-soft" />
            </div>
            
            <Button
              onClick={generateCompliment}
              size="lg"
              className="btn-lovable bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg"
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Get Your Compliment
            </Button>

            {showCompliment && (
              <div className="mt-6 p-6 bg-white/80 rounded-2xl animate-slide-up">
                <p className="text-xl md:text-2xl font-medium text-foreground">
                  {currentCompliment}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Gratitude Notes */}
        <Card className="card-glass p-6 md:p-8 space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Smile className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Gratitude Journal
              </h2>
            </div>
            
            <p className="text-center text-muted-foreground">
              Write down what you're grateful for today 🌸
            </p>

            <div className="flex gap-2">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addGratitudeNote()}
                placeholder="I'm grateful for..."
                className="flex-1 bg-white/60 border-border rounded-full px-6 py-6 text-base focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={addGratitudeNote}
                size="lg"
                className="btn-lovable bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
              >
                Add
              </Button>
            </div>

            {gratitudeNotes.length > 0 && (
              <div className="space-y-3 mt-6">
                {gratitudeNotes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-white/80 p-4 rounded-2xl flex items-center justify-between gap-4 hover:shadow-md transition-all animate-slide-up"
                  >
                    <p className="text-foreground flex-1">{note}</p>
                    <Button
                      onClick={() => deleteNote(index)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive rounded-full"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {gratitudeNotes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No notes yet. Start your gratitude journey! 💝</p>
              </div>
            )}
          </div>
        </Card>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="text-sm">Made with 💖 for spreading positivity</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
