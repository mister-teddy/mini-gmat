import { serveWithUser } from "../_shared/server.ts";
import { supabase } from "../_shared/client.ts";

serveWithUser(async (user, req) => {
  // Extract data from the request body
  let { answers, quiz_id } = await req.json();

  // Get current submission
  const submissions = await supabase
    .from("gmat_submissions")
    .select()
    .eq("taker", user.id)
    .eq("quiz_id", quiz_id)
    .is("submitted_at", null);

  // Update submission or grade it if finished
  if (submissions.data && submissions.data.length > 0) {
    const submission = submissions.data[0];
    answers = Object.assign(JSON.parse(submission.answers), { ...answers });
    const quizAnswer = await supabase
      .from("gmat_quiz_answers")
      .select()
      .eq("quiz_id", quiz_id)
      .single();
    const correctAnswers = JSON.parse(quizAnswer.data.answers) as Record<
      string,
      number | string
    >;
    // Grading
    let score = 0;
    let total_score = 0;
    for (const questionId in correctAnswers) {
      if (typeof correctAnswers[questionId] === "number") {
        total_score++;
        if (correctAnswers[questionId] === answers[questionId]) {
          score++;
        }
      } else {
        const subAnswers = JSON.parse(
          correctAnswers[questionId] as string
        ) as number[];
        for (const index in subAnswers) {
          total_score++;
          if (
            Array.isArray(answers[questionId]) &&
            answers[questionId][index] === subAnswers[index]
          ) {
            score++;
          }
        }
      }
    }
    Object.assign(submission, {
      score,
      total_score,
      answers: JSON.stringify(answers),
    });
    if (Object.keys(answers).length === Object.keys(correctAnswers).length) {
      Object.assign(submission, {
        submitted_at: new Date(),
      });
    }
    await supabase
      .from("gmat_submissions")
      .update(submission)
      .eq("id", submission.id);
    return [200, submission];
  }

  // Create new submission
  const { data, error } = await supabase
    .from("gmat_submissions")
    .insert({
      taker: user.id,
      display_name: user.name,
      avatar: user.picture.data.url,
      quiz_id: quiz_id,
      answers: JSON.stringify(answers),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return [201, data];
});
