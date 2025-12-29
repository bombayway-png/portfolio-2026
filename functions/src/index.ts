import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const calendlyWebhook = onRequest({ cors: true }, async (req, res) => {
  logger.info("LOG: Intake Attempt", { body: req.body });

  const name = req.body.name || req.body.payload?.invitee?.name || "Unknown Lead";
  const email = req.body.email || req.body.payload?.invitee?.email || "";
  const notes = req.body.notes || req.body.payload?.questions_and_answers?.[0]?.answer || "No notes";

  try {
    // PURE WRITE: No complex query, just landing the data
    await admin.firestore().collection("lilo_tasks").add({
      artifact_content: `New Lead: ${name}`,
      contact_email: email,
      description: notes,
      status: "Needs Follow-up",
      source: req.body.source || "Website_Direct",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      
      // Using your verified IDs
      uid: "5kbTnmiFdOQJUtonagrHovqb1sG3",
      orgId: "J5CITH"
    });

    logger.info(`SUCCESS: ${name} added to J5CITH`);
    res.status(200).send({ success: true });
  } catch (error: any) {
    logger.error("CRITICAL ERROR", { message: error.message });
    res.status(500).send({ error: error.message });
  }
});