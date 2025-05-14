import { FriendshipResult, Question } from '../types';

export const generateResult = (
  questions: Question[],
  answers: Record<number, number>,
  friendName: string
): FriendshipResult => {
  // Calculate raw score (0-100)
  let totalPoints = 0;
  let maxPoints = 0;
  let redFlagCount = 0;

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // Convert 0-4 index to points (0-4)
      const points = answer;
      totalPoints += points * question.weight;
      maxPoints += 4 * question.weight; // 4 is max points per question

      // Count red flags (answers below 2)
      if (points < 2) {
        redFlagCount += 1;
      }
    }
  });

  // Calculate percentage score
  const percentageScore = (totalPoints / maxPoints) * 100;
  
  // Calculate energy drain (inverse of score, 0-100)
  const energyDrain = 100 - percentageScore;

  // Determine grade
  let grade: 'solid' | 'questionable' | 'toxic';
  if (percentageScore >= 75) {
    grade = 'solid';
  } else if (percentageScore >= 50) {
    grade = 'questionable';
  } else {
    grade = 'toxic';
  }

  // Generate analysis
  let analysis = '';
  if (grade === 'solid') {
    analysis = `${friendName} seems like a genuinely supportive friend. They show up for you, respect your boundaries, and generally make you feel good. Keep this one close! They're rarer than you think.`;
  } else if (grade === 'questionable') {
    analysis = `Your relationship with ${friendName} has some good qualities, but there are definite red flags. You might need to set stronger boundaries or have a conversation about your needs in this friendship.`;
  } else {
    analysis = `Sorry to break it to you, but ${friendName} is showing multiple signs of a toxic friendship. They drain your energy, don't respect your boundaries, and the friendship feels one-sided. It might be time for a serious reconsideration.`;
  }

  return {
    grade,
    score: Math.round(percentageScore),
    analysis,
    redFlags: redFlagCount,
    energyDrain: Math.round(energyDrain),
  };
};