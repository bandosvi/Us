"use client";

import { useState } from "react";
import { questions, attachmentStyles } from "@/lib/quiz-data";

type QuizState = "intro" | "quiz" | "results";

interface Answers {
  [questionId: number]: number;
}

export default function QuizClient() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const questionId = questions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResults = () => {
    const scores = {
      secure: 0,
      anxious: 0,
      dismissive: 0,
      fearful: 0,
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const q = questions.find((q) => q.id === parseInt(questionId));
      if (q) {
        const option = q.options[optionIndex];
        scores.secure += option.scores.secure;
        scores.anxious += option.scores.anxious;
        scores.dismissive += option.scores.dismissive;
        scores.fearful += option.scores.fearful;
      }
    });

    const total = scores.secure + scores.anxious + scores.dismissive + scores.fearful;
    const percentages = {
      secure: Math.round((scores.secure / total) * 100),
      anxious: Math.round((scores.anxious / total) * 100),
      dismissive: Math.round((scores.dismissive / total) * 100),
      fearful: Math.round((scores.fearful / total) * 100),
    };

    const dominant = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as keyof typeof scores;

    return { scores, percentages, dominant };
  };

  const resetQuiz = () => {
    setQuizState("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (quizState === "intro") {
    return (
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Discover Your Love Language & Attachment Style
          </h2>
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            This quiz will help you understand your attachment style in relationships.
            Answer based on how you typically feel and act, not how you wish you were.
          </p>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-white mb-3">How it works:</h3>
            <ul className="text-neutral-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">1.</span>
                Answer 10 questions about your relationship patterns
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">2.</span>
                Get your results across 4 attachment styles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">3.</span>
                Learn about your strengths and growth areas
              </li>
            </ul>
          </div>
          <button
            onClick={() => setQuizState("quiz")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Quiz
          </button>
          <p className="text-neutral-500 text-sm mt-4">
            This is for educational purposes only, not a medical diagnosis.
          </p>
        </div>
      </div>
    );
  }

  if (quizState === "quiz") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-neutral-400 text-sm mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
              {question.text}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    answers[question.id] === index
                      ? "border-blue-500 bg-blue-500/20 text-white"
                      : "border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-white hover:bg-neutral-700/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[question.id] === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-neutral-500"
                      }`}
                    >
                      {answers[question.id] === index && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { scores, percentages, dominant } = calculateResults();
    const style = attachmentStyles[dominant];

    return (
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Attachment Style
            </h2>
            <div className="inline-block bg-blue-600/20 border border-blue-500 rounded-full px-6 py-2">
              <span className="text-blue-400 text-lg font-semibold">{style.name}</span>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 mb-6">
            <p className="text-neutral-300 text-lg leading-relaxed">{style.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">Your Style Profile</h3>
              <div className="space-y-2">
                {Object.entries(percentages)
                  .sort(([, a], [, b]) => b - a)
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-neutral-400 capitalize w-24">
                        {attachmentStyles[key as keyof typeof attachmentStyles].name}
                      </span>
                      <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            key === dominant ? "bg-blue-500" : "bg-neutral-500"
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-neutral-400 w-12 text-right">{value}%</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">Key Traits</h3>
              <ul className="text-neutral-300 space-y-1">
                {style.traits.slice(0, 4).map((trait, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span>✓</span> Your Strengths
              </h3>
              <ul className="text-neutral-300 space-y-1">
                {style.strengths.slice(0, 3).map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span>💡</span> Growth Tips
              </h3>
              <ul className="text-neutral-300 space-y-1">
                {style.tips.slice(0, 3).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg transition-colors mr-4"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}