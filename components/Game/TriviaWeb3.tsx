"use client";
import { useState } from "react";
import miniApp from "@/lib/farcaster"; // kalau mau share ke Farcaster

export default function TriviaWeb3() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const question = questions[current];

  function handleAnswer(option: string) {
    if (option === question.answer) setScore(score + 10);
    if (current < questions.length - 1) setCurrent(current + 1);
    else alert(`Game over! Your score: ${score + (option === question.answer ? 10 : 0)}`);
  }

  async function shareScore() {
    await miniApp.share({ title: "Web3 Trivia Score", content: `I scored ${score} points!` });
  }

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-10">
      {current < questions.length ? (
        <>
          <h2 className="mb-4 font-bold">{question.question}</h2>
          {question.options.map((opt) => (
            <button
              key={opt}
              className="block w-full my-2 p-2 border rounded hover:bg-gray-200"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </>
      ) : (
        <div>
          <h2>Game Over! Score: {score}</h2>
          <button onClick={shareScore} className="mt-2 p-2 bg-blue-500 text-white rounded">
            Share ke Farcaster
          </button>
        </div>
      )}
    </div>
  );
}
