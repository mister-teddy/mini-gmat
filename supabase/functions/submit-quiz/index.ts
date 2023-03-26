import { serveWithUser } from "../_shared/server.ts";
import { supabase } from "../_shared/client.ts";

serveWithUser(async (user, req) => {
  // Extract data from the request body
  const { answers, quizId } = await req.json();

  // Get current submission
  const submissions = await supabase
    .from("gmat_submissions")
    .select()
    .eq("taker", user.id)
    .eq("quiz_id", quizId)
    .is("submitted_at", null);

  // Update submission or grade it if finished
  if ((submissions.count ?? 0) > 0 && submissions.data) {
    const submission = submissions.data[0];
    const quizAnswer = await supabase
      .from("gmat_quiz_answers")
      .select()
      .eq("quiz_id", quizId)
      .single();
    const correctAnswers = JSON.parse(quizAnswer.data.answers) as Record<
      string,
      number | number[]
    >;
    if (Object.keys(answers) === Object.keys(correctAnswers)) {
      // Grading
      let score = 0;
      let totalScore = 0;
      for (const questionId in correctAnswers) {
        totalScore++;
        if (typeof correctAnswers[questionId] === "number") {
          if (correctAnswers[questionId] === answers[questionId]) {
            score++;
          } else if (
            correctAnswers[questionId].toString() ===
            answers[questionId].toString()
          ) {
            score++;
          }
        }
      }
      Object.assign(submission, {
        score,
        totalScore,
        submitted_at: new Date(),
      });
    }
    if (Object.keys(answers).length > 0) {
      Object.assign(submission, {
        answers: JSON.stringify(answers),
      });
    }
    await supabase.from("gmat_submissions").update(submission);
    return [200, submission];
  }

  // Create new submission
  const { data, error } = await supabase
    .from("gmat_submissions")
    .insert({
      taker: user.id,
      displayName: user.name,
      avatar: user.picture.data.url,
      quiz_id: quizId,
      answers: JSON.stringify(answers),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return [201, data];
});
