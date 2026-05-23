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
  
  if (request.auth?.uid !== "5kbTnmiFd0QJUtonagrHovqb1sG3") {
    throw new HttpsError('permission-denied', 'Unauthorized Access');
  }

  const { leadId, description } = request.data;
  if (!leadId) throw new HttpsError('invalid-argument', 'Missing leadId');

  logger.info(`VERTEX AGENT START: High-Fidelity Strategic Analysis for ${leadId}`);

  // Use Gemini 2.0 Flash - The 2026 Production Standard
  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
  });

  const prompt = `
    You are the LILO-OS Strategic Discovery Agent, a world-class Operations Architect.
    Transform this customer bottleneck into an elite automation roadmap: "${description}"

    STRUCTURE:
    1. ROOT CAUSE DIAGNOSIS: Identify why this friction exists at a logic/data level.
    2. THE THREE-PILLAR STRATEGY:
       - **PILLAR 1: Coordination**: Unifying data & communication flow.
       - **PILLAR 2: Optimization**: Removing manual logic gates and human latency.
       - **PILLAR 3: Orchestration**: Self-sustaining, end-to-end AI workflows.
    3. ROI ANALYSIS: Provide a specific, measurable business outcome.

    TONE: Executive, authoritative, and visionary. Under 350 words. No intro fluff.
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const themes = response.candidates?.[0].content.parts[0].text || "Strategy generation failed.";

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