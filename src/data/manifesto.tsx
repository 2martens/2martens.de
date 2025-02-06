import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export const claim = "Pragmatisch, praktisch, links";
export const heading = "Meine Themen";
export const intro =
  "Ich stehe für eine Politik, die nach der Harvard Verhandlungsmethode arbeitet: Bedürfnisse sammeln und dann zielgerichtete Lösungen finden. Stets darauf ausgerichtet das Leben in unserer Gesellschaft für alle Menschen angenehmer und besser zu machen.";

export interface Position {
  name: string;
  description: string;
  icon: IconProp;
}

export const positions: Position[] = [
  {
    name: "Menschenrechtsorientierte Politik",
    description:
      "'Die Würde des Menschen ist unantastbar.' So beginnt das Grundgesetz und das ist handlungsleitend für mich. Migration an und für sich ist kein Problem. Vor Ort gibt es Herausforderungen, die wir konkret angehen müssen. ",
    icon: byPrefixAndName.fal["life-ring"],
  },
  {
    name: "ÖPNV bedarfsgerecht ausbauen",
    description:
      "Im Zentrum haben wir bereits eine gute Anbindung, die aber mehr Kapazität benötigt. Die U5 steht maßgeblich dafür. Gerade in den ländlicheren Gegenden der Stadt brauchen wir aber auch mehr Angebot, damit der öffentliche Personenverkehr attraktiv ist.",
    icon: byPrefixAndName.far["train"],
  },
  {
    name: "Fahrplanauskunft verbessern",
    description:
      "Laut App kommt die S-Bahn pünktlich, in Wirklichkeit aber zu spät? Solche Inkonsistenzen will ich bekämpfen durch eine bessere Datenqualität der Prognosedaten von den Verkehrsbetrieben.",
    icon: byPrefixAndName.far["mobile-signal-out"],
  },
  {
    name: "Tarifreform umsetzen",
    description:
      "Der Zeitkartentarif ist bereits deutlich übersichtlicher: nur noch Deutschlandticket. Nun muss beim Gelegenheits- bzw. Bartarif auch noch entrümpelt werden. Konkret möchte ich die Zahlgrenzen loswerden.",
    icon: byPrefixAndName.far["ticket"],
  },
];
