import { serveWithUser } from "../_shared/server.ts";
import { supabase } from "../_shared/client.ts";

serveWithUser(async (user, req) => {
  // Extract data from the request body
  let { answers, quiz_id } = await req.json();

  const { data: quiz, ...rest } = await supabase
    .from("gmat_quizzes")
    .select("duration")
    .eq("id", quiz_id)
    .single();

  if (!quiz) {
    console.warn(rest);
    return [404, "This quiz does not exists!"];
  }

  const duration = quiz.duration as number;
  const cutoffTime = new Date(
    Date.now() - (duration + 1) * 60 * 1000
  ).toISOString();
  // Get current submission
  const submissions = await supabase
    .from("gmat_submissions")
    .select()
    .eq("taker", user.id)
    .eq("quiz_id", quiz_id)
    .is("submitted_at", null)
    .gt("created_at", cutoffTime);

  // Update submission
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
      number | number[]
    >;
    // Grading
    let score = 0;
    let total_score = 0;
    for (const questionId in correctAnswers) {
      const correctAnswer = correctAnswers[questionId];
      if (typeof correctAnswer === "number") {
        total_score++;
        if (correctAnswer === answers[questionId]) {
          score++;
        }
      } else {
        for (const index in correctAnswer) {
          total_score++;
          if (
            Array.isArray(answers[questionId]) &&
            answers[questionId][index] === correctAnswer[index]
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
    console.log(
      Object.keys(answers).length === Object.keys(correctAnswers).length,
      Object.keys(answers).length,
      Object.keys(correctAnswers).length
    );
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
      created_at: new Date(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return [201, data];
});
