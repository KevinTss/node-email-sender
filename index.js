////////////////////////////////////////////////////
// DATA to change

// Votre nom qui apparaitra au bas du mail
const SENDER_NAME = 'John';
// Votre email depuis lequel le mail sera envoyer (il doit être le même que le compte mailjet)
const SENDER_EMAIL = 'john.doe@email.com';

// Ces deux information se trouvent dans votre compte mailjet
const MAILJET_API_KEY = '19769868bb485975960e579cf0a7dbef';
const MAILJET_SECRET_KEY = '7d28803434badc8ee1a909b65f027e70';

// Les index pour lequels le mail seront envoyé (correspondant au ligne de l'export excel (CSV))
const INDEX_START = 1;
const INDEX_END = 200;

// Remplacer `false` par `true` pour passer en mode test
const TEST = true;

////////////////////////////////////////////////////

const mailjet = require('node-mailjet').connect(
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY
);
const csv = require('csv-parser');
const fs = require('fs');

function getEmail(emails) {
  return emails.split('|')[0].trim();
}

function getGreetings(sexe, name) {
  if (sexe !== 'F') {
    return `Cher Monsieur le député ${name}`;
  }
  return `Chère Madame la députée ${name}`;
}

function getTextMessage(greetingText, circo, senderName) {
  return `
${greetingText},

Je vous écris aujourd’hui en tant que citoyen français et habitant de ${circo} concerné par la situation de ces derniers jours Israël/Palestine et j’ai besoin de connaître votre position quant à cette dernière.

Cette position, votre position, est déterminante et centrale pour la démocratie, les droits humains, le droit des peuples à disposer d’eux-mêmes et les valeurs universalistes de la France qui me sont chères. Tout comme pour vous, je n’en doute pas.

J’imagine que les évènements de ces derniers jours ne vous ont pas échappé, mais si vous le permettez, posons ici quelques éléments factuels :

  - Des expulsions à Jérusalem-Est de familles palestiniennes sont en cours, et sont totalement illégales au regard du droit international. Pour rappel, depuis 1967, cette annexion de Jerusalem-Est par Israël est condamnée par les résolutions 476 et 478 du Conseil de sécurité des Nations Unies. La résolution 478 du Conseil de sécurité des Nations unies présente l'annexion par Israël de cette partie de Jérusalem comme “une violation du droit international”. La Cour internationale de justice fait référence à Jérusalem-Est en tant que “territoire palestinien occupé”. Pour rappel, la position officielle de la France condamne la colonisation et l’occupation.

Comment vous positionnez-vous face à cette colonisation de Jerusalem-Est ?

  - Ces expulsions sont la continuation de la politique d’expropriation des terres depuis la création de l’État d’Israël en 1948 et ce qui est considéré comme la Nakba (ou “catastrophe” en arabe) et l’exil forcé de plus de 750 000 Palestiniens.

Quelle est, s’il vous plaît, votre position face à ces expropriations toujours d’actualité en Cisjordannie ?

  - un rapport de l’association Human Rights Watch(*1), dénonce des crimes d’apartheid et de persécution par Israël envers les Palestiniens vivant sur son sol et ceux des Territoires occupés. Le rapport complet et fouillé expose une « oppression systématique » et des « actes inhumains » contre les Palestiniens par Israël. La version française résumée se trouve ici(*2).

  - En effet, dans les territoires Palestiniens occupés, les autorités israéliennes traitent les Palestiniens séparément et de manière inégale par rapport aux colons israéliens juifs. En Cisjordanie occupée, Israël soumet les Palestiniens à un régime militaire draconien et met en œuvre la ségrégation, interdisant largement l’entrée des Palestiniens dans les colonies. Dans la bande de Gaza, Israël impose un bouclage généralisé, marqué par de fortes restrictions à la circulation des personnes et des marchandises.

  - À Jérusalem-Est, Israël accorde à l’immense majorité des centaines de milliers de Palestiniens qui y vivent, un statut juridique affaiblissant leurs droits de résidence. Ce niveau de discrimination équivaut à une oppression systématique. C’est une contradiction claire de nos principes républicains et universalistes.

Pourriez-vous s’il vous plaît clarifier votre position quant aux crimes de guerre d’apartheid et de persécution par Israël ?

  - L’ONG Amnesty International parle quant à elle d’un « usage illégal de la force » d’Israël contre les manifestants palestiniens. L’ONG indique que ces mesures de répression sont « disproportionnées et illégales », accusant les forces de sécurité israéliennes « d’attaques non justifiées contre des manifestants majoritairement pacifiques ».

Comment vous positionnez-vous face à ce déploiement illégal et disproportionné de la force par un pays allié de la France ?

  - la bande de Gaza vit sous un siège depuis près de 15 ans. Depuis plusieurs jours sans trêves, sa population civile est bombardée. À l’heure où ces lignes sont écrites, plus de 210 personnes ont été tuées dont 60 enfants. La justification du droit d’Israël à se défendre face aux tirs de roquettes depuis Gaza ne justifie pas ce massacre. Le rapport de force est disproportionné. Nous comparons une puissance nucléaire, dont 20% du budget militaire provient des États-Unis à une population d’1,5 millions d’habitants, sans abris anti-bombe, hôpitaux de qualité ni ressources de bases. L’ONG Save the Children, basée à Londres, s’est dite « horrifiée » par les raids aériens israéliens appelant à cesser « de cibler et tuer des civils sans discernement ».

Quelle est, s’il vous plaît, votre position quant à ces bombardements d’une population civile ?

  - Aussi, toujours à Gaza, 23 médias locaux et internationaux ont été détruits par des frappes aériennes israéliennes ciblées depuis le regain de tensions. Les derniers bombardements en date ont détruit, samedi 15 mai, les bureaux de l’agence de presse américaine Associated Press (AP) et de la chaîne qatarie Al-Jazeera. Reporters Sans Frontière a saisi la Cour Pénale Internationale pour « crimes de guerre ».

Quelle est, s’il vous plaît, votre position face à cette atteinte à la liberté d’informer ?

  - Enfin chez nous, et plus particulièrement à Paris, l'interdiction samedi 15 mai, de la manifestation pour la paix et en soutien au peuple palestinien, relève d’un droit constitutionnel bafoué. Interdire une manifestation en prévision de supposés heurts est une atteinte majeure au droit de manifester dans notre pays.

Pourriez-vous s’il vous plaît vous prononcer quant à cette atteinte à un droit constitutionnel sans motif tangible ?

Sans être spécialiste de la situation ni militant de quelques partis que ce soit, vos réponses à ces questions sont centrales.

À l’approche d’élections importantes pour notre pays, votre prise de position est importante et nécessaire pour moi, comme pour de nombreux autres administrés de ${circo}. Malgré les difficultés et le coût politique que cela peut représenter, la défense de nos valeurs universalistes et des droits humains doit primer.

Merci d’avance pour vos réponses détaillées, je reste entièrement disponible.

Bien respectueusement,

${senderName}

*1: https://www.hrw.org/fr/news/2021/04/27/des-politiques-israeliennes-abusives-constituent-des-crimes-dapartheid-et-de

*2: https://www.hrw.org/sites/default/files/media_2021/04/israel_palestine0421_summary_fr.pdf
  `;
}

function getHtmlMessage(greetingText, circo, senderName) {
  return `
<p>${greetingText},</p>

<p>
  Je vous écris aujourd’hui en tant que citoyen français et habitant de ${circo} concerné par la situation de ces derniers jours Israël/Palestine et j’ai besoin de connaître votre position quant à cette dernière.
</p>

<p>
  Cette position, votre position, est déterminante et centrale pour la démocratie, les droits humains, le droit des peuples à disposer d’eux-mêmes et les valeurs universalistes de la France qui me sont chères. Tout comme pour vous, je n’en doute pas.
</p>

<p>
  J’imagine que les évènements de ces derniers jours ne vous ont pas échappé, mais si vous le permettez, posons ici quelques éléments factuels :
<p>

<ul>
  <li>
    - Des expulsions à Jérusalem-Est de familles palestiniennes sont en cours, et sont totalement illégales au regard du droit international. Pour rappel, depuis 1967, cette annexion de Jerusalem-Est par Israël est condamnée par les résolutions 476 et 478 du Conseil de sécurité des Nations Unies. La résolution 478 du Conseil de sécurité des Nations unies présente l'annexion par Israël de cette partie de Jérusalem comme “une violation du droit international”. La Cour internationale de justice fait référence à Jérusalem-Est en tant que “territoire palestinien occupé”. Pour rappel, la position officielle de la France condamne la colonisation et l’occupation.
  </li>
</ul>

<p>
  <b>Comment vous positionnez-vous face à cette colonisation de Jerusalem-Est ?</b>
</p>

<ul>
  <li> 
    - Ces expulsions sont la continuation de la politique d’expropriation des terres depuis la création de l’État d’Israël en 1948 et ce qui est considéré comme la Nakba (ou “catastrophe” en arabe) et l’exil forcé de plus de 750 000 Palestiniens.
  </li>
</ul>

<p>
  <b>Quelle est, s’il vous plaît, votre position face à ces expropriations toujours d’actualité en Cisjordannie ?</b>
</p>

<ul>
  <li>
    - un rapport de l’association <a href="https://www.hrw.org/fr/news/2021/04/27/des-politiques-israeliennes-abusives-constituent-des-crimes-dapartheid-et-de">Human Rights Watch</a>, dénonce des crimes d’apartheid et de persécution par Israël envers les Palestiniens vivant sur son sol et ceux des Territoires occupés. Le rapport complet et fouillé expose une « oppression systématique » et des « actes inhumains » contre les Palestiniens par Israël. La version française résumée se trouve <a href="https://www.hrw.org/sites/default/files/media_2021/04/israel_palestine0421_summary_fr.pdf">ici</a>.
  </li>
  <li>
    - En effet, dans les territoires Palestiniens occupés, les autorités israéliennes traitent les Palestiniens séparément et de manière inégale par rapport aux colons israéliens juifs. En Cisjordanie occupée, Israël soumet les Palestiniens à un régime militaire draconien et met en œuvre la ségrégation, interdisant largement l’entrée des Palestiniens dans les colonies. Dans la bande de Gaza, Israël impose un bouclage généralisé, marqué par de fortes restrictions à la circulation des personnes et des marchandises.
  </li>
  <li>
    - À Jérusalem-Est, Israël accorde à l’immense majorité des centaines de milliers de Palestiniens qui y vivent, un statut juridique affaiblissant leurs droits de résidence. Ce niveau de discrimination équivaut à une oppression systématique. C’est une contradiction claire de nos principes républicains et universalistes.
  </li>
</ul>

<p>
  <b>Pourriez-vous s’il vous plaît clarifier votre position quant aux crimes de guerre d’apartheid et de persécution par Israël ?</b>
</p>

<ul>
  <li>
    - L’ONG Amnesty International parle quant à elle d’un « usage illégal de la force » d’Israël contre les manifestants palestiniens. L’ONG indique que ces mesures de répression sont « disproportionnées et illégales », accusant les forces de sécurité israéliennes « d’attaques non justifiées contre des manifestants majoritairement pacifiques ».
  </li>
</ul>

<p>
  <b>Comment vous positionnez-vous face à ce déploiement illégal et disproportionné de la force par un pays allié de la France ?</b>
</p>

<ul>
  <li>
    - la bande de Gaza vit sous un siège depuis près de 15 ans. Depuis plusieurs jours sans trêves, sa population civile est bombardée. À l’heure où ces lignes sont écrites, plus de 210 personnes ont été tuées dont 60 enfants. La justification du droit d’Israël à se défendre face aux tirs de roquettes depuis Gaza ne justifie pas ce massacre. Le rapport de force est disproportionné. Nous comparons une puissance nucléaire, dont 20% du budget militaire provient des États-Unis à une population d’1,5 millions d’habitants, sans abris anti-bombe, hôpitaux de qualité ni ressources de bases. L’ONG Save the Children, basée à Londres, s’est dite « horrifiée » par les raids aériens israéliens appelant à cesser « de cibler et tuer des civils sans discernement ».
  <li>
</ul>

<p>
  <b>Quelle est, s’il vous plaît, votre position quant à ces bombardements d’une population civile ?</b>
</p>

<ul>
  <li>
    - Aussi, toujours à Gaza, 23 médias locaux et internationaux ont été détruits par des frappes aériennes israéliennes ciblées depuis le regain de tensions. Les derniers bombardements en date ont détruit, samedi 15 mai, les bureaux de l’agence de presse américaine Associated Press (AP) et de la chaîne qatarie Al-Jazeera. Reporters Sans Frontière a saisi la Cour Pénale Internationale pour « crimes de guerre ».
  </li>
</ul>

<p>
  <b>Quelle est, s’il vous plaît, votre position face à cette atteinte à la liberté d’informer ?</b>
</p>

<ul>
  <li>
    - Enfin chez nous, et plus particulièrement à Paris, l'interdiction samedi 15 mai, de la manifestation pour la paix et en soutien au peuple palestinien, relève d’un droit constitutionnel bafoué. Interdire une manifestation en prévision de supposés heurts est une atteinte majeure au droit de manifester dans notre pays.
  </li>
<ul>

<p>
  <b>Pourriez-vous s’il vous plaît vous prononcer quant à cette atteinte à un droit constitutionnel sans motif tangible ?</b>
<p>

<p>
  Sans être spécialiste de la situation ni militant de quelques partis que ce soit, vos réponses à ces questions sont centrales.
</p>

<p>
  À l’approche d’élections importantes pour notre pays, votre prise de position est importante et nécessaire pour moi, comme pour de nombreux autres administrés de ${circo}. Malgré les difficultés et le coût politique que cela peut représenter, la défense de nos valeurs universalistes et des droits humains doit primer.
</p>

<p>
  Merci d’avance pour vos réponses détaillées, je reste entièrement disponible.
</p>

<p>
  Bien respectueusement,
</p>

<p>
  ${senderName}
</p>
`;
}

let count = 1;

fs.createReadStream('./listing-deputes-senateurs-FR.csv')
  .pipe(csv())
  .on('data', (row) => {
    count++;

    if (count < INDEX_START || count > INDEX_END) return;

    mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: SENDER_EMAIL,
              Name: SENDER_NAME,
            },
            To: [
              {
                Email: TEST ? SENDER_EMAIL : getEmail(row.emails),
                Name: row.nom,
              },
            ],
            Subject: 'Position situation Israël/Palestine',
            TextPart: getTextMessage(
              getGreetings(row.sexe, row.nom.split(' ')[1]),
              row.nom_circo.trim(),
              SENDER_NAME
            ),
            HTMLPart: getHtmlMessage(
              getGreetings(row.sexe, row.nom.split(' ')[1]),
              row.nom_circo.trim(),
              SENDER_NAME
            ),
            CustomID: getEmail(row.emails),
          },
        ],
      })
      .then((result) => {
        // console.log(result);
        // console.log(result.body);
        console.log(
          `${count}) mail successfuly sent to: ${
            TEST ? SENDER_EMAIL : getEmail(row.emails)
          }`
        );
      })
      .catch((err) => {
        console.log(err.statusCode);
        console.log(err.message);
        // console.log(err);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
