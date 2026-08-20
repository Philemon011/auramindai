import { RtcTokenBuilder, RtcRole } from "agora-token";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;

// Durée de validité d'un token, en secondes — 4h couvre largement
// la durée d'une masterclass sans exposer un token trop longtemps.
const TOKEN_EXPIRATION_SECONDS = 4 * 60 * 60;

/**
 * Génère un token pour l'intervenant (rôle "publisher" — peut diffuser
 * sa caméra/micro). uid=0 laisse Agora assigner un uid automatiquement
 * côté client au moment de la connexion.
 */
export function generateHostToken(channelName: string) {
  const expirationTimestamp = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;

  return RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    0,
    RtcRole.PUBLISHER,
    expirationTimestamp,
    expirationTimestamp
  );
}

/**
 * Génère un token pour un spectateur (rôle "subscriber" — reçoit le flux
 * mais ne peut jamais diffuser sa propre caméra/micro dans ce channel).
 */
export function generateAudienceToken(channelName: string) {
  const expirationTimestamp = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;

  return RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    0,
    RtcRole.SUBSCRIBER,
    expirationTimestamp,
    expirationTimestamp
  );
}

/**
 * Génère un nom de channel unique pour une masterclass — préfixé pour
 * rester lisible dans le dashboard Agora si besoin de débogage.
 */
export function generateChannelName(masterclassId: string) {
  return `mc-${masterclassId}`;
}