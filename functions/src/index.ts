import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { VertexAI } from "@google-cloud/vertexai";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

// Initialize Vertex (Uses the project's internal permissions)
const vertexAI = new VertexAI({ project: 'project-cmb-a2022', location: 'us-central1' });

export const kickstartIdeation = onCall({ 
  region: "us-central1",
  invoker: "public" 
}, async (request: any) => {
  
  // Guardrail: Preserve specific admin user restriction
  if (request.auth?.uid !== "5kbTnmiFd0QJUtonagrHovqb1sG3") {
    throw new HttpsError('permission-denied', 'Unauthorized Access');
  }

  const { leadId, description } = request.data;
  if (!leadId) throw new HttpsError('invalid-argument', 'Missing leadId');

  logger.info(`VERTEX AGENT START: High-Fidelity 1-3-1 Strategic Analysis for ${leadId}`);

  // Point to an active production flagship model to eliminate the 404 error
  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });

  // Structural Prompt Engineering to completely enforce the multi-option 1-3-1 model
  const prompt = `
    You are the LILO-OS Strategic Discovery Agent, a world-class Operations Architect.
    Analyze the following user bottleneck context and transform it into an elite automation roadmap. 
    You must provide multiple paths. Do not suggest only a single option or solution.

    USER BOTTLENECK CONTEXT: 
    "${description}"

    You must format your entire response using the following strict structural blueprint. Use the exact headers provided below:

    ### 1. PROBLEM STATEMENT
    Provide exactly one crisp, high-fidelity problem statement identifying why this friction exists at a core operational logic or data level.

    ### 2. THREE SOLUTIONS
    Detail exactly three distinct, parallel solution options (Pillar 1: Coordination, Pillar 2: Optimization, Pillar 3: Orchestration). For EACH option, you must explicitly include:
    - **Strategy**: The tactical approach to solving the bottleneck.
    - **Importance**: Why this specific solution path is fundamentally important to the business architecture.
    - **ROI Attached**: A quantified, measurable commercial projection or business outcome (e.g., time saved, manual gates eliminated, resource utilization reduction).

    ### 3. ONE RECOMMENDATION
    Provide exactly one definitive, highly authoritative recommendation picking the absolute best initial velocity path forward based on structural priority.

    TONE: Executive, authoritative, and visionary. Under 450 words. No introduction fluff or conversational sign-offs.
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const themes = response.candidates?.[0].content.parts[0].text || "Strategy generation failed.";

    // Maintain target database persistence logic
    await admin.firestore().collection("lilo_tasks").doc(leadId).update({
      ai_ideation: themes,
      status: "In Review",
      last_updated: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error: any) {
    logger.error("Vertex AI Strategic Failure:", error);
    throw new HttpsError('internal', `Agent Error: ${error.message}`);
  }
});

export const calendlyWebhook = onRequest({ cors: true, region: "us-central1" }, async (req, res) => {
  res.status(200).send("Webhook received");
});