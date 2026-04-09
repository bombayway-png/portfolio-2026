import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

admin.initializeApp();

// 1. Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI("AIzaSyBxO1SPo8UmXI0cF83v7ik2ZnIwK9p4D-I");

// 2. The Cloud Function
export const kickstartIdeation = functions
  .region('us-central1') 
  .https.onCall(async (request) => { 
    
    // Security check: Using the modern 'request' object
   if (request.auth?.uid !== "5kbTnmiFd0QJUtonagrHovqb1sG3") {
      throw new functions.https.HttpsError('permission-denied', 'Unauthorized Access');
    }

    // Extracting your lead data safely
    const data = request.data;
    const leadId = data?.leadId;
    const description = data?.description;

    if (!leadId) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing leadId.');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

      // Update Firestore with the results
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
