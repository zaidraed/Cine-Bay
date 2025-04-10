import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showDots = true,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  }, [children]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Touch handling for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 5) goToNext();
    if (distance < -5) goToPrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // AutoPlay effect
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext]);

  Carousel.propTypes = {
    children: PropTypes.node.isRequired,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    showControls: PropTypes.bool,
    showDots: PropTypes.bool,
    className: PropTypes.string,
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0 w-full">{child}</div>
        ))}
      </div>

      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-zinc-900/50 hover:bg-zinc-800/80"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-zinc-900/50 hover:bg-zinc-800/80"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {React.Children.map(children, (_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === index ? "bg-blue-500 w-4" : "bg-zinc-600"
              }`}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const CarouselItem = ({ children, className }) => {
  return (
    <div className={cn("flex-shrink-0 w-full", className)}>{children}</div>
  );
};
CarouselItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
