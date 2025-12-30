import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

admin.initializeApp();

// Use the key you copied from your Enatai FF project
const genAI = new GoogleGenerativeAI("AIzaSyBxO1SPo8UmXI0cF83v7ik2ZnIwK9p4D-I");

export const kickstartIdeation = functions.https.onCall(async (data, context) => {
  // 1. Security check: Only you (Dad) can trigger this
  if (context.auth?.uid !== "5kbTnmiFdOQJUtonagrHovqb1sG3") {
    throw new functions.https.HttpsError('permission-denied', 'Unauthorized Access');
  }

  const { leadId, description } = data;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 2. The "Product Ops" Brain Script
  const prompt = `
    You are a Senior Product Operations Agent for LILO-OS.
    Analyze this user bottleneck: "${description}"
    Your goal is to prepare for a discovery meeting. 
    Propose 3 distinct themes focused on automation and ROI:
    1. THEME: Coordination (Solving manual route/driver assignments)
    2. THEME: Optimization (Fixing timing and field-readiness)
    3. THEME: Orchestration (End-to-end seasonal automation)
    Keep the output professional, bulleted, and ready for an executive summary.
  `;

  try {
    const result = await model.generateContent(prompt);
    const themes = result.response.text();

    // 3. Update the lead card with the AI's proposal
    await admin.firestore().collection("lilo_tasks").doc(leadId).update({
      ai_ideation: themes,
      status: "In Review",
      last_updated: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("Gemini Agent Error:", error);
    throw new functions.https.HttpsError('internal', 'Agent failed to process ideation.');
  }
});